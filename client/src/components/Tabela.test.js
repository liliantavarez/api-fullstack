import {render, screen} from "@testing-library/react";
import React from 'react'
import Tabela from "./Tabela";

describe("Table Component", () => {

    it("Deve exibir tabela com colunas: #, Nome, Marca e Selecionar", () => {
        render(<Tabela/>);

        expect(screen.getByRole("columnheader", {name: /#/i})).toBeInTheDocument();
        expect(screen.getByRole("columnheader", {name: /nome/i})).toBeInTheDocument();
        expect(screen.getByRole("columnheader", {name: /marca/i})).toBeInTheDocument();
        expect(screen.getByRole("columnheader", {name: /selecionar/i})).toBeInTheDocument();
    });

    it("Deve exibir produto cadastrado na tabela", () => {
        const produtos = [{
            codigo: 1,
            nome: "Iphone 12",
            marca: "Apple"
        }]
        render(<Tabela produtos={produtos}/>);

        expect(screen.getByText("Apple")).toBeInTheDocument()
        expect(screen.getByText("Iphone 12")).toBeInTheDocument()
        expect(screen.getByRole('button', {name: /selecionar/i})).toBeInTheDocument();

    });

});
