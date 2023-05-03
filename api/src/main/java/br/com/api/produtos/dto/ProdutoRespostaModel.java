package br.com.api.produtos.dto;

import lombok.Data;

/*
Quando anotamos as classes como por o exemplo com:
@Component
@RestController
@Repository
@Service
@Controller
Podemos usar a injeção de dependências, que deixa por conta do spring a criação de um objeto relacionado a classe
 */
@Data
public class ProdutoRespostaModel {
    private Long codigo;
    private String nome;
    private String marca;
}
