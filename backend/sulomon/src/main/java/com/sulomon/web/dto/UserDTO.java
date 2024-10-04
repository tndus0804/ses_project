package com.sulomon.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Integer userNum;      // 사용자 번호
    private String userId;        // 사용자 아이디
    private String password;      // 비밀번호
    private String email;         // 이메일
    private String name;          // 이름
    private LocalDate birthday;   // 생년월일
    private String gender;        // 성별
    private boolean socialLogin;  // 소셜 로그인 여부
    private String role;          // 역할
    private String address;       // 주소
    private String phoneNumber;   // 전화번호
    private String mbti;          // MBTI
    private int points;           // 포인트
    private LocalDateTime createdAt;  // 계정 생성 시간
    private LocalDateTime updatedAt;  // 계정 수정 시간
    private String status;        // 계정 상태
}