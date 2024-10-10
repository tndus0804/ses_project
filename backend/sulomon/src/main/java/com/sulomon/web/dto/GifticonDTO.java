package com.sulomon.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GifticonDTO {

    private Integer gifticonId;       // 기프티콘 ID
    private UUID userNum;          // 사용자 ID
    private String phoneNumber;       // 받는 사람의 핸드폰 번호
    private String gifticonType;      // 기프티콘 종류
    private BigDecimal amount;        // 기프티콘 금액
    private String status;    // 기프티콘 상태 (PENDING, SENT, FAILED)
    private LocalDateTime createdAt;  // 기프티콘 생성 시간


}