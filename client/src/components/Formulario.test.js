import {fireEvent, render, screen} from "@testing-library/react";
import Formulario from "./Formulario";
import Tabela from "./Tabela";

describe("Formulario Component", () => {
    it("Deve exibir inputs de para nome e marca do produto", () => {
        render(<Formulario/>);

        expect(screen.getByRole("textbox", {name: /nome/i})).toBeInTheDocument();
        expect(screen.getByRole("textbox", {name: /marca/i})).toBeInTheDocument();
    });

    it("Deve exibir botão de cadastro", () => {
        render(<Formulario botao={true}/>);

        expect(
            screen.getByRole("button", {name: /cadastrar/i})
        ).toBeInTheDocument();
    });

    it("Não deve exibir botão de cadastro caso haja algum item selecionado na tabela", () => {
        render(<Tabela/>);
        const btnSelecionar = screen.getByText(/selecionar/i);

        fireEvent.click(btnSelecionar);
        render(<Formulario/>);

        expect(
            screen.queryByRole("button", {name: /cadastrar/i})
        ).not.toBeInTheDocument();
    });

    it("Deve exibir botoes de alterar, remover e cancelar caso haja algum item selecionado na tabela", () => {
        render(<Tabela/>);
        const btnSelecionar = screen.getByText(/selecionar/i);

        fireEvent.click(btnSelecionar);
        render(<Formulario/>);

        expect(
            screen.getByRole("button", {name: /alterar/i})
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: /remover/i})
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: /cancelar/i})
        ).toBeInTheDocument();
    });

    it("Deve exibir mensagem de erro caso nome do produto não seja preenchido", () => {
        render(<Formulario status={false} mensagemResposta={"O nome do produto é obrigatório"} botao={true}/>);
        const btnCadastro = screen.getByText(/cadastrar/i);
        fireEvent.click(btnCadastro)

        expect(screen.getByRole('alert')).toHaveTextContent(/o nome do produto é obrigatório/i)
        expect(screen.getByRole('alert')).toHaveStyle({backgroundColor: "#fff2f0"})
    })
    it("Deve exibir mensagem de erro caso marca do produto não seja preenchida", () => {
        render(<Formulario status={false} mensagemResposta={"O nome da marca é obrigatório"} botao={true}/>);
        const btnCadastro = screen.getByText(/cadastrar/i);
        const inputNome = screen.getByLabelText('Nome')
        fireEvent.change(inputNome, {target: {value: 'nome produto'}})

        fireEvent.click(btnCadastro)

        expect(screen.getByRole('alert')).toHaveTextContent(/o nome da marca é obrigatório/i)
        expect(screen.getByRole('alert')).toHaveStyle({backgroundColor: "#fff2f0"})
    })
    it("Deve informar que produto foi cadastrado caso nome e marca tenham sido preenchidos", () => {
        render(<Formulario status={true} mensagemResposta={"Produto cadastrado com sucesso!"} botao={true}/>);
        const btnCadastro = screen.getByText(/cadastrar/i);
        const inputNome = screen.getByLabelText('Nome')
        fireEvent.change(inputNome, {target: {value: 'nome produto'}})
        const inputMarca = screen.getByLabelText('Marca')
        fireEvent.change(inputMarca, {target: {value: 'marca produto'}})

        fireEvent.click(btnCadastro)

        expect(screen.getByRole('alert')).toHaveTextContent(/produto cadastrado com sucesso!/i)
        expect(screen.getByRole('alert')).toHaveStyle({backgroundColor: "#f6ffed"})
    })
});
