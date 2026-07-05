package web.logic.abstractions;

import web.models.ResultContext;

public interface Handler {
    void handle(ResultContext resultContext);
    void setNextHandler(Handler nextHandler);
}