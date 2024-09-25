package com.sulomon.web.entity;

import jakarta.persistence.*;
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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gifticon_id")
    int gifticonId;

    // User 엔티티와 연관
    @ManyToOne
    @JoinColumn(name = "user_num", nullable = false)
    UserEntity userNum;

    // 보낼 핸드폰 번호
    @Column(name = "phone_number", length = 30)
    String phoneNumber;

    //
    @Column(name = "gifticon_type", length = 50)
    String gifticonType;

    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    GifticonStatus status = GifticonStatus.PENDING;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    LocalDateTime createdAt = LocalDateTime.now();

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now(); // 처음 저장할 때 시간 설정
    }

    public enum GifticonStatus {
        PENDING, SENT, FAILED
    }
}
