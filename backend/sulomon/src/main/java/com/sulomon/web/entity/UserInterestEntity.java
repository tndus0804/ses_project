package com.sulomon.web.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_interests")
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

    @ManyToMany(mappedBy = "interests")
    Set<UserEntity> user = new HashSet<>();
}
