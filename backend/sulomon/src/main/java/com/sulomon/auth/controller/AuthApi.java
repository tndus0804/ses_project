package com.sulomon.auth.controller;

import com.sulomon.auth.cache.RefreshToken;
import com.sulomon.auth.cache.RefreshTokenRepository;
import com.sulomon.auth.dto.AuthenticationDto.AuthRequest;
import com.sulomon.auth.dto.AuthenticationDto.AuthResponse;
import com.sulomon.auth.entity.UserEntity;
import com.sulomon.web.repository.UserRepository;
import com.sulomon.web.security.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Base64.Encoder;

@Slf4j
@RestController
public class AuthApi {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder refreshTokenEncoder;
    private final UserRepository userRepository;  // UserRepository 선언
    private final RefreshTokenRepository refreshTokenRepository;

    public AuthApi(
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            @Qualifier("refreshTokenEncoder") PasswordEncoder refreshTokenEncoder,
            RefreshTokenRepository refreshTokenRepository,
            UserRepository userRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshTokenEncoder = refreshTokenEncoder;
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody @Valid AuthRequest authRequest,
            HttpServletResponse response
    ) {

        log.info("토큰 : {}", authRequest);

        try {
            // 암호화된 비밀번호와 입력된 비밀번호 비교
            boolean exists = userRepository.existsByUserId(authRequest.userId());
            if (!exists) {
                throw new UsernameNotFoundException("아이디 또는 비밀번호가 일치하지 않습니다.");
            }

            // 아이디, 비밀번호 맞는지 확인 (틀리면 예외, 맞으면 반환)
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.userId(), authRequest.password())
            );
            // 이 라인까지 왔다는 건 윗줄에서 예외가 안 떴다는 것(아이디, 비밀번호 맞다는 것)

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // JWT 생성
            String token = jwtUtil.generateToken(authRequest.userId());
            log.debug("생성된 JWT 토큰: {}", token);

            SecureRandom secureRandom = new SecureRandom();
            byte[] bytes = new byte[16];
            secureRandom.nextBytes(bytes); // call by reference vs call by value
            Encoder encoder = Base64.getEncoder().withoutPadding();
            String refreshTokenBase64 = encoder.encodeToString(bytes);
            String encodedRefreshToken = refreshTokenEncoder.encode(refreshTokenBase64);

            log.debug("refreshTokenBase64: {}", refreshTokenBase64);
            log.debug("encodedRefreshToken: {}", encodedRefreshToken);

            // 사용자에게 전달(HTTP Only Cookie)
            Cookie cookie = new Cookie("refresh_token", refreshTokenBase64);
            cookie.setHttpOnly(true);
            cookie.setMaxAge(2_592_000);
            // cookie.setSecure(true); // HTTPS
            // cookie.setDomain("");
            // cookie.setPath("/");
            response.addCookie(cookie);

            // DB에 저장
            RefreshToken entity = RefreshToken.builder()
                    .userId(authRequest.userId())
                    .refreshToken(encodedRefreshToken)
                    .timeToLive(2_592_000)
                    .build();

            refreshTokenRepository.save(entity);

            // JWT 반환
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        }
    }
}