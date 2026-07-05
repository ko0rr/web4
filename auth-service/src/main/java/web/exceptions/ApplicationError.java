package web.exceptions;

import jakarta.ws.rs.core.Response;
import lombok.Getter;

@Getter
public enum ApplicationError {
    INVALID_CREDENTIALS("Неверные учётные данные. Проверьте логин и пароль", Response.Status.UNAUTHORIZED),
    USERNAME_ALREADY_EXISTS("Пользователь с таким логином уже существует", Response.Status.CONFLICT),
    POINT_ALREADY_EXISTS("Такая точка уже существует", Response.Status.CONFLICT),
    INVALID_TOKEN("Токен недействителен", Response.Status.UNAUTHORIZED),
    NO_TOKEN("Нет токена", Response.Status.UNAUTHORIZED),
    VALIDATION_FAILED("Ошибка валидации", Response.Status.BAD_REQUEST);

    private final String message;
    private final Response.Status status;

    ApplicationError(String message, Response.Status status) {
        this.message = message;
        this.status = status;
    }
}