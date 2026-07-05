package web.dao;

import jakarta.enterprise.context.ApplicationScoped;
import org.hibernate.Session;
import web.entity.Point;
import web.utility.HibernateUtil;
import java.util.List;

@ApplicationScoped
public class PointDAO {
    public List<Point> findPointsByOwner(String username) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("from Point p where p.ownerUsername = :u", Point.class)
                    .setParameter("u", username).getResultList();
        }
    }

    public void savePoint(Point point) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            session.beginTransaction();
            session.persist(point);
            session.getTransaction().commit();
        }
    }
}