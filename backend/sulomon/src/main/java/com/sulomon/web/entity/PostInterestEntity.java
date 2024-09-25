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
@Table(name = "post_interest")
@IdClass(PostInterestId.class)  // 복합 키 클래스
public class PostInterestEntity {

    @Id
    @ManyToOne
    @JoinColumn(name = "post_id", referencedColumnName = "post_id", nullable = false)  // 외래 키와 매핑
    PostsEntity postId;  // Post 엔티티와 연관 관계 설정

    @Id
    @ManyToOne
    @JoinColumn(name = "interest_id", referencedColumnName = "interest_id", nullable = false)  // 외래 키와 매핑
    InterestEntity interestId;  // Interest 엔티티와 연관 관계 설정
}