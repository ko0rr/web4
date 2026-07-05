package web.security;

import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import web.utility.JwtUtil;
import web.dto.MessageResponse;

@Provider
public class JwtFilter implements ContainerRequestFilter {
    @Inject
    private JwtUtil jwtUtil;

    @Override
    public void filter(ContainerRequestContext requestContext) {
        if (requestContext.getMethod().equals("OPTIONS")) return;

        String authHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
                    .entity(new MessageResponse("Токен отсутствует")).build());
            return;
        }

        String token = authHeader.substring(7);
        String username = jwtUtil.getUsernameFromToken(token);

        if (username == null) {
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
                    .entity(new MessageResponse("Невалидный токен")).build());
        } else {

            requestContext.setProperty("username", username);
        }
    }
}