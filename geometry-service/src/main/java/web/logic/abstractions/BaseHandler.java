package web.logic.abstractions;

import web.models.ResultContext;

abstract public class BaseHandler implements Handler {
    private Handler nextHandler;

    @Override
    public void setNextHandler(Handler nextHandler) {
        this.nextHandler = nextHandler;
    }

    @Override
    public void handle(ResultContext resultContext) {
        process(resultContext);
        if (nextHandler != null) {
            nextHandler.handle(resultContext);
        }
    }

    protected abstract void process(ResultContext resultContext);
}