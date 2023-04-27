package br.com.api.produtos.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

/*
Quando anotamos as classes como por o exemplo com:
@Component
@RestController
@Repository
@Service
@Controller
Podemos usar a injeção de dependências, que deixa por conta do spring a criação de um objeto relacionado a classe
 */
@Component
@Getter
@Setter
public class RespostaModel {

  private String mensagem;
}
