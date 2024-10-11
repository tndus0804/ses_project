package com.sulomon.auth.controller;

import com.sulomon.auth.dto.AuthenticationDto.AuthRequest;
import com.sulomon.auth.dto.AuthenticationDto.AuthResponse;
import com.sulomon.auth.entity.UserEntity;
import com.sulomon.web.repository.UserRepository;
import com.sulomon.web.security.JwtUtil;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class AuthApi {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserRepository userRepository;  // UserRepository 선언

    public AuthApi(AuthenticationManager authenticationManager, JwtUtil jwtUtil,
                   BCryptPasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
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

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // JWT 생성
            String token = jwtUtil.generateToken(authRequest.userId());
            log.debug("생성된 JWT 토큰: {}", token);
            // JWT 반환
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        }
    }
}