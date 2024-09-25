package com.sulomon.web.entity;

import jakarta.persistence.*;
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

    // 사용자 번호 (users 테이블과 연결)
    @Id
    @ManyToOne
    @JoinColumn(name = "user_num", nullable = false)
    UserEntity userNum;

    // 관심사 ID (interests 테이블과 연결)
    @Id
    @ManyToOne
    @JoinColumn(name = "interest_id", nullable = false)
    InterestEntity interestId;
}