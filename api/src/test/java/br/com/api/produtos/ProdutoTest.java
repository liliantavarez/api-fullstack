package br.com.api.produtos;

import br.com.api.produtos.model.ProdutoModel;
import br.com.api.produtos.model.RespostaModel;
import io.restassured.http.ContentType;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.notNullValue;
import static org.junit.Assert.assertEquals;

public class ProdutoTest {

    @BeforeAll
    public static void beforeAll() {
        baseURI = "http://localhost";
        port = 8080;
    }

    @Test
    public void deveCadastrarUmNovoProduto() {

        ProdutoModel produto = new ProdutoModel("iPhone 13", "Apple");
        given()
                .body(produto)
                .contentType(ContentType.JSON)
                .when()
                .post("/cadastrar")
                .then()
                .assertThat()
                .statusCode(201)
                .body("codigo", notNullValue());
    }

    @Test
    public void deveRetornarStatusCode400CasaTenteCadastrarUmProdutosSemPreencherTodosOsCampos() {

        ProdutoModel produtoSemMarca = new ProdutoModel("iPhone 13", "");
        RespostaModel responseProdutoSemMarca = given()
                .body(produtoSemMarca)
                .contentType(ContentType.JSON)
                .when()
                .post("/cadastrar")
                .then()
                .assertThat()
                .statusCode(400)
                .log().all()
                .extract()
                .as(RespostaModel.class);
        assertEquals("O nome da marca é obrigatório", responseProdutoSemMarca.getMensagem());

    }
}
