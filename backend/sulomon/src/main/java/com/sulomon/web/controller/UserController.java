package com.sulomon.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sulomon.web.dto.UserDTO;
import com.sulomon.web.security.JwtUtil;
import com.sulomon.web.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

// 회원가입, 로그인, 비밀번호 변경 및 정보 수정 처리
// CRUD 작업에 대한 API 제공
@Slf4j
@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class UserController {

    private final UserService us;
    private final ObjectMapper objectMapper; // ObjectMapper 추가
    private final JwtUtil jwtUtil;

    @PostMapping("/signup")
    public String join(@RequestBody Map<String, Object> signupData) {
        log.info("회원가입 요청 데이터: {}", signupData);
        try {
            // Map 데이터를 UserDTO로 변환
            UserDTO userDTO = objectMapper.convertValue(signupData, UserDTO.class);
            log.info("변환된 UserDTO: {}", userDTO);

            // 서비스로 넘김
            us.join(userDTO);
        } catch (Exception e) {
            log.error("Error converting Map to UserDTO", e);
            return "회원가입 실패";
        }

        return "redirect:/";
    }
    
    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UserDTO updatedUser) {
        log.info("회원정보 수정 요청 데이터: {}", updatedUser);
        try {
            us.updateUser(updatedUser); 
            return ResponseEntity.ok("회원정보 수정 성공");
        } catch (Exception e) {
            log.error("회원정보 수정 실패", e);
            return ResponseEntity.status(400).body("회원정보 수정 실패");
        }
    }
    
    @PostMapping("/delete") 
    public ResponseEntity<?> deleteUser(@RequestBody Map <String, Object> requestData) {
    	// token
    	String token = (String) requestData.get("token");
    	String username = jwtUtil.extractUsername(token);    	
    	
        log.info("회원탈퇴 요청: {}", username);
        try {
            us.deleteUser(username); // 서비스로 넘김
            return ResponseEntity.ok("회원탈퇴 성공");
        } catch (Exception e) {
            log.error("회원탈퇴 실패", e);
            return ResponseEntity.status(400).body("회원탈퇴 실패");
        }
    }
    
    @PostMapping("/current")
    public ResponseEntity<UserDTO> getCurrentUser(@RequestBody Map<String, Object> requestData) {
    	// token
    	String token = (String) requestData.get("token");
    	String username = jwtUtil.extractUsername(token);
    	
    	log.debug(username);
        UserDTO user = us.getCurrentUser(username);
        return ResponseEntity.ok(user);
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