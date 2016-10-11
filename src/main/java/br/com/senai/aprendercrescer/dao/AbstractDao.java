/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.senai.aprendercrescer.dao;

import br.com.senai.aprendercrescer.model.AbstractModel;
import javax.persistence.EntityManager;

/**
 *
 * @author Caluan Baierle
 */
public abstract class AbstractDao<T extends AbstractModel> {
    
    EntityManager em; //Responsavel por pegar a conexao com o banco de dados
    
    public AbstractDao(){
        em = Conexao.getConexao();
    }
    
    
    public void gravar(T objeto){
        em.getTransaction().begin(); //pega a transação e inicia 
        if (objeto.isNew()){
            em.persist(objeto);
        }else{
            em.merge(objeto);
        }
        em.getTransaction().commit();
    }
    
}
