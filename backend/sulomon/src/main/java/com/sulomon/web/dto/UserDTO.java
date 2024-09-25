package com.sulomon.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Integer userNum;      // 사용자 번호
    private String userId;        // 사용자 아이디
    private String email;         // 이메일
    private String name;          // 이름
    private Date birthday;        // 생년월일
    private Gender gender;        // 성별
    private boolean socialLogin;  // 소셜 로그인 여부
    private Role role;            // 사용자 역할
    private String address;       // 주소
    private String phoneNumber;   // 전화번호
    private String mbti;          // MBTI
    private int points;           // 포인트
    private LocalDateTime createdAt;  // 계정 생성 시간
    private LocalDateTime updatedAt;  // 계정 수정 시간
    private Status status;        // 계정 상태
    private Set<InterestDTO> interests;  // 관심사 (DTO로 변환)

    // ENUM 타입들 정의 (Entity와 동일)
    public enum Gender {
        MALE, FEMALE, OTHER
    }

    public enum Role {
        USER, ADMIN
    }

    public enum Status {
        ACTIVE, INACTIVE, BANNED
    }


}
