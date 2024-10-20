package com.sulomon.auth.controller;

import com.sulomon.auth.dto.AuthenticationDto.AuthResponse;
import com.sulomon.web.security.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/login/kakao")
public class KakaoLoginController {

    private final JwtUtil jwtUtil;

    public KakaoLoginController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<?> kakaoLogin(@RequestBody Map<String, String> requestBody) {
        String accessToken = requestBody.get("token");
        log.info("Received Access Token: {} ", accessToken);
        try {
            // 카카오 사용자 정보 요청
            String requestUrl = "https://kapi.kakao.com/v2/user/me";
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            HttpEntity<String> request = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.exchange(requestUrl, HttpMethod.GET, request, String.class);

            // JSON 파싱 후 사용자 정보 저장
            JSONObject userInfo = new JSONObject(response.getBody());

            // 사용자 ID
            long kakaoId = userInfo.getLong("id");

            // 닉네임 가져오기 (properties에서)
            String nickname = userInfo.getJSONObject("properties").getString("nickname");

            // 닉네임 가져오기 (kakao_account.profile에서)
            String profileNickname = userInfo.getJSONObject("kakao_account")
                    .getJSONObject("profile")
                    .getString("nickname");

            log.info("User ID: {}, Nickname: {}, Profile Nickname: {}", kakaoId, nickname, profileNickname);

            // JWT 발급 로직 추가
            String token = jwtUtil.generateToken(nickname); // JWT 발급

            // JWT 토큰 반환
            return ResponseEntity.ok(new AuthResponse(token));

        } catch (Exception e) {
            log.error("카카오 로그인 실패", e);
            // JSON 형식으로 에러 메시지 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "카카오 로그인 실패"));
        }
    }
}