import { useEffect, useState } from "react";
import "./App.css";
import Formulario from "./Formulario";
import Tabela from "./Tabela";

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
  const [response, setResponse] = useState();

  //UseEffect
  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then((retorno) => retorno.json())
      .then((retorno_json) => setProdutos(retorno_json));
  }, []);

  // Obtendo os dados do formulário
  const aoDigitar = (event) => {
    setObjProduto({ ...objProduto, [event.target.name]: event.target.value });
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
          setResponse(responseJson.mensagem);
          alert(responseJson.mensagem);
        } else {
          setProdutos([...produtos, responseJson]);
          alert("Produto cadastrado com sucesso!");
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
        alert(responseJson.mensagem);
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
          setResponse(responseJson.mensagem);
          alert(responseJson.mensagem);
        } else {
          alert("Produto atualizado com sucesso!");
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
        response={response}
        cancelar={limparFormulario}
        remover={removerProduto}
        atualizar={atualizarProduto}
      />
      <Tabela produtos={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
