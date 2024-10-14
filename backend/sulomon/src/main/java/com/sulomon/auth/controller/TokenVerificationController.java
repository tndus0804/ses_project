package com.sulomon.auth.controller;

import com.sulomon.web.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TokenVerificationController {

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/verify-token")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String authHeader) {
        try {
            // Bearer token에서 JWT만 추출
            String token = authHeader.substring(7);

            // 토큰에서 사용자 이름 추출
            String username = jwtUtil.extractUsername(token);

            // 토큰 유효성 검사
            if (jwtUtil.validateToken(token, username)) {
                return ResponseEntity.ok("Token is valid");
            } else {
                return ResponseEntity.status(401).body("Invalid token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid token or token parsing error");
        }
    }
}
