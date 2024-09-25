package com.sulomon.web.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
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
@Table(name = "payments")
public class PaymentEntity {

    // 결제 ID (AUTO_INCREMENT, PRIMARY KEY)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Integer paymentId;

    // 결제 금액 (BigDecimal 타입, NOT NULL, 소수점 두 자리까지 허용)
    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount; // 결제 금액

    // 결제 방법 (ENUM, NOT NULL)
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod; // 결제 방법 (TOSS, NAVER_PAY, KAKAO_PAY)

    // 결제 상태 (ENUM, NOT NULL, DEFAULT PENDING)
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private PaymentStatus status = PaymentStatus.PENDING; // 결제 상태 (PENDING, COMPLETED, FAILED)

    // 결제 생성 시간 (DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now(); // 결제 생성 시간

    // 결제 생성 시 생성 시간 설정
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now(); // 처음 저장할 때 시간 설정
    }

    // 결제 방법을 정의하는 ENUM (TOSS, NAVER_PAY, KAKAO_PAY)
    public enum PaymentMethod {
        TOSS, NAVER_PAY, KAKAO_PAY
    }

    // 결제 상태를 정의하는 ENUM (PENDING, COMPLETED, FAILED)
    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED
    }
}
