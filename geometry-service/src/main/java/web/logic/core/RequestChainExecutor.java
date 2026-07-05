package web.logic.core;

import web.logic.abstractions.Handler;
import web.logic.handlers.ResultHandler;
import web.logic.handlers.ValidationHandler;

public class RequestChainExecutor {
    public Handler createChain() {
        Handler validationHandler = new ValidationHandler();
        Handler resultHandler = new ResultHandler();
        validationHandler.setNextHandler(resultHandler);
        return validationHandler;
    }
}