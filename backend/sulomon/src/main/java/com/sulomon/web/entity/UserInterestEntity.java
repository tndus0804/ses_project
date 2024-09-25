package com.sulomon.web.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_interests")
@IdClass(UserInterestId.class)  // 복합 키를 위한 IdClass 사용
public class UserInterestEntity {

    // 사용자 번호 (users 테이블과 연관, ManyToOne 관계)
    @Id
    @ManyToOne
    @JoinColumn(name = "user_num", nullable = false)
    private UserEntity userNum; // 사용자와 연관된 UserEntity

    // 관심사 ID (interests 테이블과 연관, ManyToOne 관계)
    @Id
    @ManyToOne
    @JoinColumn(name = "interest_id", nullable = false)
    private InterestEntity interestId; // 관심사와 연관된 InterestEntity
}