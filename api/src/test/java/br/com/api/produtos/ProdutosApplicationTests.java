package br.com.api.produtos;

import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.greaterThan;

//@AutoConfigureTestDatabase(replace = Replace.NONE)
//@ActiveProfiles("test")
@DataJpaTest
class ProdutosApplicationTestsRestAssure {

    @Test
    void buscarTodosProdutosComSucesso() {
        given()
                .accept(ContentType.JSON)
                .when()
                .get("http://localhost:8080/listar")
                .then()
                .assertThat()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("size()", greaterThan(0));
    }
}
