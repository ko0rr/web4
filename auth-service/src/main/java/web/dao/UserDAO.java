package web.dao;

import jakarta.enterprise.context.ApplicationScoped;
import org.hibernate.Session;
import org.hibernate.Transaction;
import web.entity.User;
import web.utility.HibernateUtil;

@ApplicationScoped
public class UserDAO {
    public User findUserByUsername(String username) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("from User u where u.username = :username", User.class)
                    .setParameter("username", username)
                    .uniqueResult();
        }
    }

    public User findUserByRefreshToken(String token) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("from User u where u.refreshToken = :token", User.class)
                    .setParameter("token", token)
                    .uniqueResult();
        }
    }

    public void saveNewUser(User user) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            System.out.println("Сессия открыта");


            Transaction transaction = session.beginTransaction();
            System.out.println("Транзакция началась");


            session.persist(user);
            System.out.println("После persist");


            transaction.commit();
        }
        System.out.println("После закрытия сессии");

    }

    public void updateRefreshToken(Long userId, String newToken) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.createQuery("update User u set u.refreshToken = :token where u.id = :id")
                    .setParameter("token", newToken)
                    .setParameter("id", userId)
                    .executeUpdate();
            transaction.commit();
        }
    }

    public void clearRefreshToken(Long userId) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.createQuery("update User u set u.refreshToken = null where u.id = :id")
                    .setParameter("id", userId)
                    .executeUpdate();
            transaction.commit();
        }
    }
}