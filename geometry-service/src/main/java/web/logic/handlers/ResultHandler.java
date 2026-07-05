package web.logic.handlers;


import web.dto.Result;
import web.logic.abstractions.BaseHandler;
import web.logic.core.HitCheck;
import web.models.PointData;
import web.models.ResultContext;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class ResultHandler extends BaseHandler {
    @Override
    protected void process(ResultContext resultContext) {
        PointData point = resultContext.getPointData();
        long start = resultContext.getStartTime();
        HitCheck hitCheck = new HitCheck(point.getX(), point.getY(), point.getR());
        boolean isHit = hitCheck.wasThereHit();
        long scriptTime = System.nanoTime() - start;
        ZonedDateTime currentTime = ZonedDateTime.now(ZoneId.of("Europe/Moscow"));
        String serverTime = currentTime.format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"));
        Result result = new Result(point.getX(), point.getY(), point.getR(), isHit, serverTime,  scriptTime);
        resultContext.setResult(result);
    }
}