package web.utility;

import org.mindrot.jbcrypt.BCrypt;

public class HashingUtil {
    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt(10));
    }

    public static boolean verifyPassword(String password, String hashedPassword) {
        if (password == null || hashedPassword == null) return false;
        return BCrypt.checkpw(password, hashedPassword);
    }
}