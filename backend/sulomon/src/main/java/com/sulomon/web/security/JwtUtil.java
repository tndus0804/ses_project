package com.sulomon.web.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Base64.Encoder;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {

    private final Key secret;
    private final long expirationTime;

    public JwtUtil(@Value("${jwt.secret}") String secret, @Value("${jwt.expiration}") long expirationTime) {
        Encoder encoder = Base64.getEncoder().withoutPadding();
        String inputKeyBase64 = encoder.encodeToString(
                secret.getBytes(StandardCharsets.UTF_8)
        );
        byte[] keyBytes = Decoders.BASE64.decode(inputKeyBase64);
        this.secret = Keys.hmacShaKeyFor(keyBytes);
        this.expirationTime = expirationTime;
    }

    // JWT 토큰 생성
    public String generateToken(String username) {
        return generateToken(username, Map.of("role", "user"));
    }

    // JWT 토큰 생성
    public String generateToken(String username, Map<String, ?> payload) {
        Claims claims = Jwts.claims()
                .setSubject(username);

        Date now = new Date();
        Date expirationAt = new Date(now.getTime() + expirationTime);

        claims.putAll(payload);
        claims.computeIfAbsent("role", (ignore) -> "user"); // map에서 computeIfAbsent = get + put(if null) 동시에

        return Jwts.builder()
                .setSubject(username)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expirationAt)
                .signWith(secret)
                .compact();
    }

    // JWT 토큰에서 사용자 이름 추출
    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    // 토큰 만료 여부 확인
    public boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    // 토큰 유효성 검사
    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }

    // 토큰에서 Claims 정보 추출
    private Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }
}