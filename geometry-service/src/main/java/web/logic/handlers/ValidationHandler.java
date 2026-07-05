package web.logic.handlers;

import web.exceptions.ApplicationError;
import web.exceptions.ApplicationException;
import web.logic.abstractions.BaseHandler;
import web.logic.core.Validation;
import web.models.PointData;
import web.models.ResultContext;

import java.util.Map;

public class ValidationHandler extends BaseHandler {
    @Override
    protected void process(ResultContext resultContext) {
        Map<String, String> coordinates = resultContext.getCoordinates();
        Validation validation = new Validation();
        validation.validateXYR(coordinates);
        if (validation.hasErrors()) {
            throw new ApplicationException(ApplicationError.VALIDATION_FAILED);
        }
        float x = validation.getX();
        float y = validation.getY();
        float r = validation.getR();
        PointData point = new PointData(x, y, r);
        resultContext.setPointData(point);
    }
}