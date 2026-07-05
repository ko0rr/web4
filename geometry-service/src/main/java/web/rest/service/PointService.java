package web.rest.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import web.dao.PointDAO;
import web.entity.Point;
import web.models.PointData;
import web.models.ResultContext;
import web.logic.abstractions.Handler;
import web.logic.core.RequestChainExecutor;
import java.util.List;

@ApplicationScoped
public class PointService {
    @Inject private PointDAO pointDAO;
    private final Handler chain = new RequestChainExecutor().createChain();

    public Point addPoint(PointData pointData, String username) {
        ResultContext context = new ResultContext();
        context.getCoordinates().put("x", String.valueOf(pointData.getX()));
        context.getCoordinates().put("y", String.valueOf(pointData.getY()));
        context.getCoordinates().put("r", String.valueOf(pointData.getR()));

        chain.handle(context);

        Point point = new Point();
        point.setX(context.getResult().x());
        point.setY(context.getResult().y());
        point.setR(context.getResult().r());
        point.setHit(context.getResult().hit());
        point.setServerTime(context.getResult().serverTime());
        point.setScriptTime(context.getResult().scriptTime());
        point.setOwnerUsername(username);

        pointDAO.savePoint(point);
        return point;
    }

    public List<Point> getPoints(String username) {
        return pointDAO.findPointsByOwner(username);
    }
}