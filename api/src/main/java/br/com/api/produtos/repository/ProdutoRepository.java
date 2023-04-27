package br.com.api.produtos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/* 
Responsável por disponibilizar acoes de banco de dados, como: 
- cadastramento
- seleções 
- alterações
- exclusões
...
*/

import br.com.api.produtos.model.ProdutoModel;

@Repository
public interface ProdutoRepository extends JpaRepository<ProdutoModel, Long> {}
