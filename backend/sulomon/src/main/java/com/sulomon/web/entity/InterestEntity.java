package com.sulomon.web.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
@Table(name = "interests")
public class InterestEntity {

    // 관심사 ID (AUTO_INCREMENT, PRIMARY KEY)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interest_id")
    private Integer interestId;

    // 관심사 이름 (VARCHAR 100, UNIQUE, NOT NULL)
    @Column(name = "interest_name", length = 100, unique = true, nullable = false)
    private String interestName;

    // 게시물과의 다대다 관계를 정의 (post_interest 테이블을 통해 매핑)
    @ManyToMany
    @JoinTable(
            name = "post_interest", // 연결 테이블 이름
            joinColumns = @JoinColumn(name = "post_id"), // 현재 엔티티의 외래 키 (post_id)
            inverseJoinColumns = @JoinColumn(name = "interest_id") // 반대 엔티티의 외래 키 (interest_id)
    )
    private Set<InterestEntity> interests = new HashSet<>();
}