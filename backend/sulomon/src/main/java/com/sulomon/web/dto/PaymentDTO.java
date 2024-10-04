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
    private String paymentMethod; // 결제 방법 (TOSS, NAVER_PAY, KAKAO_PAY)
    private String status;        // 결제 상태 (PENDING, COMPLETED, FAILED)
    private LocalDateTime createdAt;     // 결제 생성 시간

}