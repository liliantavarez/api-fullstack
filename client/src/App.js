import {useEffect, useState} from "react";
import "./App.css";
import Formulario from "./components/Formulario";
import Tabela from "./components/Tabela";

function App() {
    //Objeto produto
    const produto = {
        codigo: 0,
        nome: "",
        marca: "",
    };
    // UseState
    const [btnCadastrar, setBtnCadastrar] = useState(true);
    const [produtos, setProdutos] = useState([]);
    const [objProduto, setObjProduto] = useState(produto);
    const [mensagemResposta, setmensagemResposta] = useState("");
    const [status, setStatus] = useState(false);

    //UseEffect
    useEffect(() => {
        fetch("http://localhost:8080/listar")
            .then((retorno) => retorno.json())
            .then((retorno_json) => setProdutos(retorno_json));
    }, []);

    // Obtendo os dados do formulário
    const aoDigitar = (event) => {
        setObjProduto({...objProduto, [event.target.name]: event.target.value});
    };

    // Limpar formulário
    const limparFormulario = () => {
        setObjProduto(produto);
        setBtnCadastrar(true);
    };

    //Selecionar produto
    const selecionarProduto = (record) => {
        setObjProduto(record);
        setBtnCadastrar(false);
    };

    // Cadastrar produto
    const cadastrar = () => {
        fetch("http://localhost:8080/cadastrar", {
            method: "POST",
            body: JSON.stringify(objProduto),
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.mensagem !== undefined) {
                    console.log("if cadastro: " + responseJson.mensagem)
                    console.log("if status: " + status)
                    console.log("if res: " + mensagemResposta)
                    setStatus(false)
                    setmensagemResposta(responseJson.mensagem);
                } else {
                    setStatus(true)
                    setmensagemResposta("Produto cadastrado com sucesso!")
                    setProdutos([...produtos, responseJson]);
                    limparFormulario();
                }
            });
    };

    //Remover produto da lista/banco
    const removerProduto = () => {
        fetch("http://localhost:8080/remover/" + objProduto.codigo, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setStatus(true)
                setmensagemResposta(responseJson.mensagem)
                //Copia de vetor de produtos
                let vetorTemp = [...produtos];
                //Buscando index do produto que foi removido
                let indice = vetorTemp.findIndex((produto) => {
                    return produto.codigo === objProduto.codigo;
                });
                //Removendo produto do vetor temporario
                vetorTemp.splice(indice, 1);
                //Atualizar vetor de produtos
                setProdutos(vetorTemp);

                limparFormulario();
            });
    };

    // Atualizar produto
    const atualizarProduto = () => {
        fetch("http://localhost:8080/atualizar", {
            method: "PUT",
            body: JSON.stringify(objProduto),
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.mensagem !== undefined) {
                    setmensagemResposta(responseJson.mensagem);
                } else {
                    setStatus(true)
                    setmensagemResposta("Produto atualizado com sucesso!")
                    //Copia de vetor de produtos
                    let vetorTemp = [...produtos];
                    //Buscando index do produto que foi removido
                    let indice = vetorTemp.findIndex((produto) => {
                        return produto.codigo === objProduto.codigo;
                    });
                    //Alterar produto do vetor temporario
                    vetorTemp[indice] = objProduto;
                    //Atualizar vetor de produtos
                    setProdutos(vetorTemp);

                    limparFormulario();
                }
            });
    };
    // Retorno
    return (
        <div className="App">
            <Formulario
                botao={btnCadastrar}
                eventoTeclado={aoDigitar}
                cadastrar={cadastrar}
                obj={objProduto}
                selecionado={objProduto}
                mensagemResposta={mensagemResposta}
                cancelar={limparFormulario}
                remover={removerProduto}
                atualizar={atualizarProduto}
                status={status}
            />
            <Tabela produtos={produtos} selecionar={selecionarProduto}/>
        </div>
    );
}

export default App;
