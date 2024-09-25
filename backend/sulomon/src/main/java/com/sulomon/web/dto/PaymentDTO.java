package com.sulomon.web.dto;

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
public class PaymentDTO {

    private Integer paymentId;           // 결제 ID
    private BigDecimal amount;           // 결제 금액
    private PaymentMethod paymentMethod; // 결제 방법
    private PaymentStatus status;        // 결제 상태
    private LocalDateTime createdAt;     // 결제 생성 시간

    // 결제 방법을 정의하는 ENUM (TOSS, NAVER_PAY, KAKAO_PAY)
    public enum PaymentMethod {
        TOSS, NAVER_PAY, KAKAO_PAY
    }

    // 결제 상태를 정의하는 ENUM (PENDING, COMPLETED, FAILED)
    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED
    }
}