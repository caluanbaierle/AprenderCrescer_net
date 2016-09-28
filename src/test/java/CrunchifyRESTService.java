/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import br.com.senai.aprendercrescer.ws.*;
import br.com.senai.aprendercrescer.controller.UsuarioController;
import br.com.senai.aprendercrescer.model.Usuario;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONObject;

/**
 *
 * @author Caluan Baierle
 */
@Path("/test")
public class CrunchifyRESTService {

    @POST
    @Path("/crunchifyService")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response crunchifyREST(InputStream incomingData) {
        StringBuilder crunchifyBuilder = new StringBuilder();
        try {
            BufferedReader in = new BufferedReader(new InputStreamReader(incomingData));
            String line = null;
            while ((line = in.readLine()) != null) {
                crunchifyBuilder.append(line);
            }

            JSONObject juser = new JSONObject(crunchifyBuilder.toString());

            System.out.println("" + juser.get("nome"));

            Usuario user = new Usuario();

            user.setNome(juser.getString("nome"));
            user.setLogin(juser.getString("nome"));
            user.setSenha(juser.getString("senha"));

            if (new UsuarioController().insereUsuario(user)) {

                return Response.status(200).entity(user.toString()).build();
            }else{
                return Response.status(201).entity(user.toString()).build();
                
            }
                
        } catch (Exception e) {
            System.out.println("Error Parsing: - ");
            return Response.status(200).entity("Error Parsing: - ").build();
        }
        //  System.out.println("Data Received: " + crunchifyBuilder.toString());

        // return HTTP response 200 in case of success
        //    return Response.status(200).entity(user.toString()).build();
    }

    @GET
    @Path("/verify")
    @Produces(MediaType.TEXT_PLAIN)
    public Response verifyRESTService(InputStream incomingData) {
        String result = "CrunchifyRESTService Successfully started..";

        // return HTTP response 200 in case of success
        return Response.status(200).entity(result).build();
    }

}
