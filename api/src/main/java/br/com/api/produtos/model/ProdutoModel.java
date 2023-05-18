package br.com.api.produtos.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "produtos")
@Entity(name = "Produto")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
    private String nome;
    private String marca;

    public ProdutoModel(String nome, String marca) {
        this.nome = nome;
        this.marca = marca;
    }
}
