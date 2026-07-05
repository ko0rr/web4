package web.rest.resource;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.*;
import web.models.PointData;
import web.rest.service.PointService;

@Path("/points")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class PointResource {
    @Inject
    private PointService pointService;

    @POST
    public Response addPoint(PointData data, @Context SecurityContext sc) {

        String username = sc.getUserPrincipal().getName();
        return Response.status(Response.Status.CREATED)
                .entity(pointService.addPoint(data, username)).build();
    }

    @GET
    public Response getPoints(@Context SecurityContext sc) {
        String username = sc.getUserPrincipal().getName();
        return Response.ok(pointService.getPoints(username)).build();
    }
}