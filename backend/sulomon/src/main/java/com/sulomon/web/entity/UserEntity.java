package com.sulomon.web.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class UserEntity {

    // 유저 ID (AUTO_INCREMENT, PRIMARY KEY)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_num")
    private Integer userNum;

    // 아이디 (VARCHAR 20, NOT NULL, UNIQUE)
    @Column(name = "user_id", length = 20, nullable = false, unique = true)
    private String userId;

    // 패스워드 (VARCHAR 255)
    @Column(name = "password")
    private String password;

    // 이메일 (VARCHAR 100, NOT NULL, UNIQUE)
    @Column(name = "email", length = 100, nullable = false, unique = true)
    private String email;

    // 이름 (VARCHAR 100, NOT NULL)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    // 생년월일 (DATE, NOT NULL)
    @Column(name = "birthday", nullable = false)
    @Temporal(TemporalType.DATE)
    private LocalDate birthday;

    // 성별 (VARCHAR 10, NOT NULL)
    @Column(name = "gender", length = 10, nullable = false)
    private String gender;

    // 소셜 로그인 여부 (BOOLEAN, NOT NULL, DEFAULT false)
    @Column(name = "social_login", nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    private boolean socialLogin;

    // 사용자 역할 (VARCHAR 10, NOT NULL, DEFAULT USER)
    @Column(name = "role", length = 10, nullable = false, columnDefinition = "VARCHAR(10) DEFAULT 'user'")
    private String role;

    // 사용자 주소 (VARCHAR 255)
    @Column(name = "address")
    private String address;

    // 전화번호 (VARCHAR 30)
    @Column(name = "phone_number", length = 30)
    private String phoneNumber;

    // MBTI (CHAR 4)
    @Column(name = "mbti", length = 4)
    private String mbti;

    // 포인트 (INT, NOT NULL, DEFAULT 0)
    @Column(name = "points", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer points;

    // 계정 생성 시간 (DATETIME, 최초 생성 시에만 설정되고 이후 수정 불가)
    @Column(name = "created_at", updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    // 계정 수정 시간 (DATETIME)
    @Column(name = "updated_at", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    // 계정 상태 (VARCHAR 10, NOT NULL)
    @Column(name = "status", length = 10, nullable = false, columnDefinition = "VARCHAR(10) DEFAULT 'active'")
    private String status;

    @PrePersist
    public void prePersist() {
        if(role == null) this.role = "user";
        this.createdAt = LocalDateTime.now(); // 처음 저장할 때 생성 시간 설정
        if(status == null) this.status = "active"; // 상태
    }
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now(); // 수정할 때마다 수정 시간을 현재 시간으로 갱신
    }
}
