package com.sulomon.web.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "point_withdrawal_request")
public class PointWithdrawalRequestEntity {

    // 출금 요청 ID (AUTO_INCREMENT, PRIMARY KEY)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "withdrawal_id")
    private Integer withdrawalId;

    // 출금 요청 사용자 (User 테이블과 연관)
    @ManyToOne
    @JoinColumn(name = "user_num", nullable = false)
    private UserEntity userNum; // User 엔티티와 연관

    // 요청 금액 (NOT NULL)
    @Column(name = "requested_amount", nullable = false)
    private Integer requestedAmount;

    // 은행 이름 (VARCHAR 100, NOT NULL)
    @Column(name = "bank_name", nullable = false, length = 100)
    private String bankName; // 은행 이름

    // 계좌 번호 (VARCHAR 50, NOT NULL)
    @Column(name = "account_number", nullable = false, length = 50)
    private String accountNumber; // 계좌 번호

    // 출금 요청 상태 (VARCHAR 20, NOT NULL, DEFAULT 'pending')
    @Column(name = "status", nullable = false, length = 20, columnDefinition = "VARCHAR(20) DEFAULT 'pending'")
    private String status; // 출금 요청 상태 ('pending', 'approved', 'rejected')

    // 출금 요청 생성 시간 (DATETIME, DEFAULT CURRENT_TIMESTAMP)
    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt; // 출금 요청 생성 시간

    // 출금 처리 시간 (DATETIME)
    @Column(name = "processed_at")
    private LocalDateTime processedAt; // 출금 처리 시간

    // 출금 요청이 처음 저장될 때 생성 시간 설정
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now(); // 처음 저장할 때 시간 설정
        if(status == null) this.status = "active"; // 상태
    }
    // 요청 금액의 제약 조건을 확인하는 메서드 (업데이트 시 호출)
    @PreUpdate
    public void validateRequestedAmount() {
        if (requestedAmount <= 5500 || requestedAmount >= 100000) {
            throw new IllegalArgumentException("5,000원에서 100,000원 사이로 입력해주세요.");
        }
    }
}