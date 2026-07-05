package web.rest.resource;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.NewCookie;
import jakarta.ws.rs.core.Response;
import web.dto.AuthRequest;
import web.dto.MessageResponse;
import web.dto.TokenResponse;
import web.rest.service.AuthService;

@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Path("/auth")
public class AuthResource {
    @Inject
    private AuthService authService;

    @GET
    @Path("/test")
    public Response test() {
        return Response.ok("Auth API работает!").build();
    }

    @POST
    @Path("/register")
    public Response register(AuthRequest request) {
        authService.register(request.username(), request.password());
        return Response.ok(new MessageResponse("Регистрация успешна")).build();
    }

    @POST
    @Path("/login")
    public Response login(AuthRequest request) {
        AuthService.Tokens tokens = authService.login(request.username(), request.password());
        NewCookie newCookie = new NewCookie.Builder("refreshToken")
                .value(tokens.refreshToken())
                .path("/api")
                .sameSite(NewCookie.SameSite.STRICT)
                .httpOnly(true)
                .maxAge(30*24*60*60)
                .build();
        return Response.ok(new TokenResponse(tokens.accessToken())).cookie(newCookie).build();
    }

    @POST
    @Path("/refresh")
    public Response refresh(@CookieParam("refreshToken") String refreshToken) {
        String newAccessToken = authService.refresh(refreshToken);
        return Response.ok(new TokenResponse(newAccessToken)).build();
    }

    @POST
    @Path("/logout")
    public Response logout(@CookieParam("refreshToken") String refreshToken) {
        authService.logout(refreshToken);
        NewCookie clearedCookie = new NewCookie.Builder("refreshToken")
                .value("")
                .path("/api")
                .sameSite(NewCookie.SameSite.STRICT)
                .httpOnly(true)
                .maxAge(0)
                .build();
        return Response.ok(new MessageResponse("Пользователь успешно вышел")).cookie(clearedCookie).build();
    }
}