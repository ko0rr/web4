package web.exceptions;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import web.dto.MessageResponse;

@Provider
public class ApplicationExceptionMapper implements ExceptionMapper<ApplicationException> {

    @Override
    public Response toResponse(ApplicationException exception) {
        ApplicationError error = exception.getApplicationError();
        MessageResponse responseBody = new MessageResponse(error.getMessage());
        return Response.status(error.getStatus())
                .entity(responseBody)
                .type(MediaType.APPLICATION_JSON)
                .build();
    }
}