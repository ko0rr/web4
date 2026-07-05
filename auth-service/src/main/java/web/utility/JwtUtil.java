package web.utility;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.concurrent.TimeUnit;
import jakarta.enterprise.context.ApplicationScoped;
import web.entity.User;

@ApplicationScoped
public class JwtUtil {
    private static final long ACCESS_EXPIRATION_MS;
    private static final long REFRESH_EXPIRATION_MS;
    private static final SecretKey ACCESS_KEY;
    private static final SecretKey REFRESH_KEY;
    private final String USERNAME_CLAIM = "username";

    static {
        try {
            String accessSecret = System.getenv("JWT_ACCESS_SECRET");
            String refreshSecret = System.getenv("JWT_REFRESH_SECRET");
            if (accessSecret == null || refreshSecret == null) {
                throw new RuntimeException("JWT секретов нет в переменных окружения");
            }
            ACCESS_KEY = Keys.hmacShaKeyFor(accessSecret.getBytes());
            REFRESH_KEY = Keys.hmacShaKeyFor(refreshSecret.getBytes());

            ACCESS_EXPIRATION_MS = TimeUnit.MINUTES.toMillis(Long.parseLong(System.getenv("JWT_ACCESS_EXP_MIN")));
            REFRESH_EXPIRATION_MS = TimeUnit.DAYS.toMillis(Long.parseLong(System.getenv("JWT_REFRESH_EXP_DAYS")));
        } catch (Exception e) {
            throw new RuntimeException("Ошибка при инициализации JwtUtil: " + e);
        }
    }

    private static final String SECRET = System.getenv("JWT_ACCESS_SECRET");
    private static final long EXPIRATION = TimeUnit.MINUTES.toMillis(30);

    public String generateAccessToken(User user) {
        return Jwts.builder()
                .subject(user.getUsername())
                .claim("username", user.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(ACCESS_KEY)
                .compact();
    }

    public String generateRefreshToken(User user) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + REFRESH_EXPIRATION_MS);
        return Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(expiration)
                .claim(USERNAME_CLAIM, user.getUsername())
                .signWith(REFRESH_KEY)
                .compact();
    }

    public String getUsernameFromToken(String token, boolean isRefresh) {
        SecretKey signingKey = isRefresh ? REFRESH_KEY : ACCESS_KEY;
        try {
            Jws<Claims> claims = Jwts.parser()
                    .verifyWith(signingKey)
                    .build()
                    .parseSignedClaims(token);
            return claims.getPayload().get(USERNAME_CLAIM, String.class);
        } catch (JwtException e) {
            return null;
        }
    }
}