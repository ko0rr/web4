package web.utility;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class JwtUtil {
    private static final String SECRET = System.getenv("JWT_ACCESS_SECRET");
    private static final SecretKey ACCESS_KEY = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String getUsernameFromToken(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(ACCESS_KEY)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getSubject();
        } catch (Exception e) {
            return null;
        }
    }
}