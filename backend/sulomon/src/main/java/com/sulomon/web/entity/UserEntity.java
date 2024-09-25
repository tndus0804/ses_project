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
    private Date birthday;

    // 성별 (ENUM, NOT NULL)
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    // 소셜 로그인 여부 (BOOLEAN, NOT NULL)
    @Column(name = "social_login", nullable = false)
    private boolean socialLogin = false;

    // 사용자 역할 (ENUM, NOT NULL)
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role = Role.USER;

    // 사용자 주소 (VARCHAR 255)
    @Column(name = "address")
    private String address;

    // 전화번호 (VARCHAR 30)
    @Column(name = "phone_number", length = 30)
    private String phoneNumber;

    // MBTI (CHAR 4)
    @Column(name = "mbti", length = 4)
    private String mbti;

    // 포인트 (INT, NOT NULL)
    @Column(name = "points", nullable = false)
    private Integer points = 0;

    // 계정 생성 시간 (DATETIME, 최초 생성 시에만 설정되고 이후 수정 불가)
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // 계정 수정 시간 (DATETIME)
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // 계정 상태 (ENUM, NOT NULL)
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status = Status.ACTIVE;

    // 사용자와 관심사의 다대다 관계를 정의
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
