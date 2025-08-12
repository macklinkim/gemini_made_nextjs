package com.example.backend.util;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);
    private static final String SECRET_KEY = "mySecretKeyForJWT2024SpringBootBackendApplication123456789";
    private static final int JWT_EXPIRATION = 86400000; // 24시간

    private final SecretKeySpec key;

    public JwtUtil() {
        this.key = new SecretKeySpec(SECRET_KEY.getBytes(), SignatureAlgorithm.HS256.getJcaName());
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", username);
        claims.put("iat", System.currentTimeMillis());

        String token = createToken(claims, username);
        logger.info("JWT generated for user: {}", username);
        return token;
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    public String extractUsername(String token) {
        try {
            Claims claims = extractAllClaims(token);
            String username = claims.getSubject();
            logger.debug("Extracted username from token: {}", username);
            return username;
        } catch (Exception e) {
            logger.error("Error extracting username from token: {}", e.getMessage());
            throw e;
        }
    }

    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            logger.warn("JWT token is expired: {}", e.getMessage());
            throw e;
        } catch (JwtException e) {
            logger.warn("JWT token is invalid: {}", e.getMessage());
            throw e;
        }
    }

    private Boolean isTokenExpired(String token) {
        try {
            Date expiration = extractExpiration(token);
            boolean isExpired = expiration.before(new Date());
            if (isExpired) {
                logger.warn("Token is expired. Expiration date: {}", expiration);
            }
            return isExpired;
        } catch (Exception e) {
            logger.warn("Error checking token expiration: {}", e.getMessage());
            return true;
        }
    }

    public Boolean validateToken(String token, String username) {
        try {
            final String extractedUsername = extractUsername(token);
            boolean isValid = extractedUsername.equals(username) && !isTokenExpired(token);

            if (isValid) {
                logger.info("Token validation successful for user: {}", username);
            } else {
                logger.warn("Token validation failed for user: {}. Extracted username: {}, Is expired: {}",
                        username, extractedUsername, isTokenExpired(token));
            }

            return isValid;
        } catch (Exception e) {
            logger.error("Token validation error for user {}: {}", username, e.getMessage());
            return false;
        }
    }
}