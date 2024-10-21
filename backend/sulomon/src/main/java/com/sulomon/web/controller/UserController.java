package com.sulomon.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sulomon.auth.service.EmailService;
import com.sulomon.web.dto.UserDTO;
import com.sulomon.web.security.JwtUtil;
import com.sulomon.web.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

// 회원가입, 로그인, 비밀번호 변경 및 정보 수정 처리
// CRUD 작업에 대한 API 제공
@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService us;
    private final ObjectMapper objectMapper; // ObjectMapper 추가
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    @PostMapping("/signup")
    public ResponseEntity<String> join(@RequestBody Map<String, Object> signupData) {
        log.info("회원가입 요청 데이터: {}", signupData);

        try {
            // Map 데이터를 UserDTO로 변환
            UserDTO userDTO = objectMapper.convertValue(signupData, UserDTO.class);
            log.info("변환된 UserDTO: {}", userDTO);

            // 이메일과 인증 코드 추출
            String email = (String) signupData.get("email");
            String inputCode = (String) signupData.get("verificationCode");

            // 이메일이나 인증 코드가 없으면 오류 반환
            if (email == null || inputCode == null) {
                log.error("이메일 또는 인증 코드가 누락되었습니다.");
                return ResponseEntity.status(400).body("이메일 또는 인증 코드가 누락되었습니다.");
            }

            // 입력된 인증 코드가 올바른지 확인
            boolean isVerified = us.verifyEmailCode(email, inputCode);
            if (!isVerified) {
                log.error("이메일 인증 코드가 일치하지 않습니다.");
                return ResponseEntity.status(400).body("이메일 인증 코드가 일치하지 않습니다.");
            }

            // 인증이 성공하면 회원가입 진행
            us.join(userDTO);
            return ResponseEntity.ok("회원가입 성공");

        } catch (Exception e) {
            log.error("회원가입 중 오류 발생", e);
            return ResponseEntity.status(500).body("회원가입 중 오류가 발생했습니다.");
        }
    }

    // 이메일 인증 코드 전송 API
    @PostMapping("/send-verification-email")
    public ResponseEntity<String> sendVerificationEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        // 이메일로 인증 코드 전송
        String verificationCode = us.generateVerificationCode();
        emailService.sendVerificationEmail(email, verificationCode);

        // 인증 코드를 이메일과 함께 저장
        us.storeVerificationCode(email, verificationCode);

        // 클라이언트에게 성공 메시지 전송
        return ResponseEntity.ok("인증 이메일이 전송되었습니다.");
    }

    // 이메일 인증 코드 확인 API
    @PostMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String inputCode = request.get("verificationCode");

        if (email == null || inputCode == null) {
            return ResponseEntity.status(400).body("이메일 또는 인증 코드가 누락되었습니다.");
        }

        // 입력된 코드가 맞는지 확인
        boolean isValid = us.verifyEmailCode(email, inputCode);
        if (isValid) {
            return ResponseEntity.ok("이메일 인증 성공");
        } else {
            return ResponseEntity.status(400).body("이메일 인증 실패");
        }
    }

    @PostMapping("/verify-password")
    public ResponseEntity<?> verifyPassword(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        String password = requestBody.get("password");
        String username = jwtUtil.extractUsername(token);

        boolean check = us.passwordCheck(username, password);
        if (check) {
            return ResponseEntity.ok().body("Password verified");
        } else {
            return ResponseEntity.status(401).body("Invalid password");
        }
    }
}