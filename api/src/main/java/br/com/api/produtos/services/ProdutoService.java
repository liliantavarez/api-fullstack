package br.com.api.produtos.services;

import br.com.api.produtos.dto.ProdutoRespostaModel;
import br.com.api.produtos.model.ProdutoModel;
import br.com.api.produtos.model.RespostaModel;
import br.com.api.produtos.repository.ProdutoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private RespostaModel respostaModel;

    @Autowired
    private ModelMapper model;

    // Método para listar todos os produtos
    public Iterable<ProdutoRespostaModel> listarProdutos() {
        return produtoRepository.findAll().stream().map(
                produto -> model.map(produto, ProdutoRespostaModel.class)).collect(Collectors.toList());
    }

    // Método para cadastrar ou atualizar produtos
    public ResponseEntity<?> cadastrarAtualizarProduto(
            ProdutoModel produto,
            String acao
    ) {
        if (produto.getNome().equals("")) {
            respostaModel.setMensagem("O nome do produto é obrigatório");
            return new ResponseEntity<RespostaModel>(
                    respostaModel,
                    HttpStatus.BAD_REQUEST
            );
        } else if (produto.getMarca().equals("")) {
            respostaModel.setMensagem("O nome da marca é obrigatório");
            return new ResponseEntity<RespostaModel>(
                    respostaModel,
                    HttpStatus.BAD_REQUEST
            );
        } else {
            if (acao.equals("cadastrar")) {
                return new ResponseEntity<ProdutoModel>(
                        produtoRepository.save(produto),
                        HttpStatus.CREATED
                );
            } else {
                return new ResponseEntity<ProdutoModel>(
                        produtoRepository.save(produto),
                        HttpStatus.OK
                );
            }
        }
    }

    // Método para remover produtos
    public ResponseEntity<RespostaModel> removerProduto(Long codigo) {
        produtoRepository.deleteById(codigo);
        respostaModel.setMensagem("Produto removido com sucesso!");
        return new ResponseEntity<RespostaModel>(respostaModel, HttpStatus.OK);
    }
}
