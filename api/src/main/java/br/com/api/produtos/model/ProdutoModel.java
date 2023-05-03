package br.com.api.produtos.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "produtos")
@Entity(name = "Produto")
@Getter
@Setter
public class ProdutoModel {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long codigo;
  private String nome;
  private String marca;
}
