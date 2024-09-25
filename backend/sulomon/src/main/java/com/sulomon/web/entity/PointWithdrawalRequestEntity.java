package com.sulomon.web.entity;

import jakarta.persistence.*;
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
@Table(name = "point_withdrawal_requests")
public class PointWithdrawalRequestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "withdrawal_id")
    int withdrawalId;

    @ManyToOne
    @JoinColumn(name = "user_num", nullable = false)
    UserEntity userNum; // User 엔티티와 연관

    @Column(name = "requested_amount", nullable = false)
    int requestedAmount;

    @Column(name = "bank_name", nullable = false, length = 100)
    String bankName;

    @Column(name = "account_number", nullable = false, length = 50)
    String accountNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    WithdrawalStatus status = WithdrawalStatus.PENDING;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "processed_at")
    LocalDateTime processedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now(); // 처음 저장할 때 시간 설정
    }

    public enum WithdrawalStatus {
        PENDING, APPROVED, REJECTED
    }

    // 요청 금액 제약 조건을 코드에서 처리하는 방식으로 적용 가능
    @PreUpdate
    public void validateRequestedAmount() {
        if (requestedAmount <= 5500 || requestedAmount >= 100000) {
            throw new IllegalArgumentException("5,000원에서 100,000원 사이로 입력해주세요.");
        }
    }
}
