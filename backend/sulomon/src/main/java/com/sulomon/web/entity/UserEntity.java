package com.sulomon.web.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT를 JPA에서 지원하는 방식
    @Column(name = "user_num")
    int userNum;

    // 아이디
    @Column(name = "user_id", length = 20, nullable = false, unique = true)
    String userId;

    // 패스워드
    @Column(name = "password")
    String password;

    // 이메일
    @Column(name = "email", length = 100, nullable = false, unique = true)
    String email;

    // 이름
    @Column(name = "name", length = 100, nullable = false)
    String name;

    // 생년월일 (DATE)
    @Column(name = "birthday", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date birthday;

    // 성별 (ENUM)
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    // 소셜 로그인 여부 (BOOLEAN)
    @Column(name = "social_login", nullable = false)
    private boolean socialLogin = false;

    // 사용자 역할 (ENUM)
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role = Role.USER;

    // 사용자 주소 (VARCHAR 255)
    @Column(name = "address", length = 255)
    private String address;

    // 전화번호 (VARCHAR 30)
    @Column(name = "phone_number", length = 30)
    private String phoneNumber;

    // MBTI (VARCHAR 10)
    @Column(name = "mbti", length = 10)
    private String mbti;

    // 포인트 (INT)
    @Column(name = "points", nullable = false)
    private int points = 0;

    // 계정 생성 시간 (DATETIME)
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // 계정 수정 시간 (DATETIME)
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // 계정 상태 (ENUM)
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status = Status.ACTIVE;

    @ManyToMany
    @JoinTable(
            name = "user_interests",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "interest_id")
    )
    Set<InterestEntity> interests = new HashSet<>();

    // ENUM 타입들 정의
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
