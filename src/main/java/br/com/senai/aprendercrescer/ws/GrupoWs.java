/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.senai.aprendercrescer.ws;

import br.com.senai.aprendercrescer.controller.GrupoController;
import br.com.senai.aprendercrescer.controller.UsuarioController;
import br.com.senai.aprendercrescer.model.Grupo;
import br.com.senai.aprendercrescer.model.Usuario;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.scene.media.Media;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Caluan Baierle
 */
@Path("/grupo")
public class GrupoWs {

    @GET
    @Path("/getgrupos")
    @Produces("application/json")
    public Response getAllGrupos() {
        try {
            GrupoController grupoController;
            grupoController = new GrupoController();
            ArrayList<Grupo> lista = grupoController.getGrupos();

            JSONObject jGrupo;
            StringBuilder retorno = new StringBuilder();
            retorno.append("[");
            boolean controle = false;
            for (Grupo grupo : lista) {
                if (controle) {
                    retorno.append(" , ");
                }

                jGrupo = new JSONObject();
                jGrupo.put("idGrupo", grupo.getIdGrupo());
                jGrupo.put("descricao", grupo.getDescricaoGrupo());
                jGrupo.put("tipoUsuario", grupo.getTipoUsuario());
                retorno.append(jGrupo.toString());
                controle = true;
            }

            retorno.append("]");
            return Response.status(200).entity(retorno.toString()).build();
        } catch (Exception ex) {
            System.out.println("Erro:" + ex);
            return Response.status(500).entity(
                    "{erro : \"" + ex + "\"}").build();
        }
    }

    @POST
    @Path("/setgrupo")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces("application/json")
    public Response setUsuario(InputStream dadosServ) {
        StringBuilder requisicaoFinal = new StringBuilder();
        try {
            BufferedReader in
                    = new BufferedReader(
                            new InputStreamReader(dadosServ));
            String requisicao = null;
            while ((requisicao = in.readLine()) != null) {
                requisicaoFinal.append(requisicao);
            }
            System.out.println(requisicaoFinal.toString());

            JSONObject resposta
                    = new JSONObject(requisicaoFinal.toString());
            Grupo grupo = new Grupo();

            
            grupo.setDescricaoGrupo(resposta.getString("descricao"));
            grupo.setIdGrupo(resposta.getInt("idGrupo"));
            grupo.setTipoUsuario(resposta.getString("tipoUsuario"));
            
            if (new GrupoController().insereGrupo(grupo)) {
                Response.status(200).entity("{\"result\" : \"Cadastrado com Sucesso\"}").build();
            } else {
                Response.status(200).entity("{\"result\" : \"Erro no Cadastro\"}").build();
            }
        } catch (Exception ex) {
            return Response.status(500).
                    entity(ex.toString()).build();
        }
        return null;
    }

}
