package br.com.api.produtos.controllers;

import br.com.api.produtos.dto.ProdutoRespostaModel;
import br.com.api.produtos.model.ProdutoModel;
import br.com.api.produtos.model.RespostaModel;
import br.com.api.produtos.services.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/*
 Responsável por criar rotas e ter acesso a requisições do tipo:
 - POST
 - GET
 - PUT
 - DELETE
 - PATCH
*/
@RestController
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;


    @GetMapping("/")
    public String rota() {
        return "Api de produtos funcionando";
    }

    @GetMapping("/listar")
    public Iterable<ProdutoRespostaModel> listar() {
        return produtoService.listarProdutos();
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ProdutoModel produto) {
        return produtoService.cadastrarAtualizarProduto(produto, "cadastrar");
    }

    @PutMapping("/atualizar")
    public ResponseEntity<?> atualizar(@RequestBody ProdutoModel produto) {
        return produtoService.cadastrarAtualizarProduto(produto, "atualizar");
    }

    @DeleteMapping("/remover/{codigo}")
    public ResponseEntity<RespostaModel> remover(@PathVariable Long codigo) {
        return produtoService.removerProduto(codigo);
    }
}
