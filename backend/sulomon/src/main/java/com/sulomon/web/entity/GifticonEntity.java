package com.sulomon.web.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "gifticons")
public class GifticonEntity {

    // 기프티콘 ID (AUTO_INCREMENT, PRIMARY KEY)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gifticon_id")
    private Integer gifticonId;

    // 기프티콘을 보내는 사용자 (User 테이블과 연관)
    @ManyToOne
    @JoinColumn(name = "user_num", nullable = false)
    private UserEntity userNum; // 사용자와 연관된 UserEntity

    // 기프티콘을 받을 핸드폰 번호 (VARCHAR 30)
    @Column(name = "phone_number", length = 30)
    private String phoneNumber; // 기프티콘을 받을 핸드폰 번호

    // 기프티콘 종류 (VARCHAR 50)
    @Column(name = "gifticon_type", length = 50)
    private String gifticonType; // 기프티콘 종류

    // 금액 (소수점 2자리까지 허용, NOT NULL)
    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount; // 기프티콘 금액

    // 기프티콘 상태 (ENUM, 기본값 PENDING)
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private GifticonStatus status = GifticonStatus.PENDING; // 기프티콘 상태 (PENDING, SENT, FAILED)

    // 기프티콘 생성 시간 (DATETIME, 기본값 CURRENT_TIMESTAMP)
    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now(); // 기프티콘 생성 시간

    // 기프티콘이 처음 저장될 때 생성 시간 설정
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now(); // 처음 저장할 때 시간 설정
    }

    // 기프티콘 상태를 정의하는 ENUM (PENDING, SENT, FAILED)
    public enum GifticonStatus {
        PENDING, SENT, FAILED
    }
}
