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
@Table(name = "post_interest")
@IdClass(PostInterestId.class)  // 복합키 클래스
public class PostInterestEntity {

    // 게시글 ID (외래키로 PostsEntity와 연관)
    @Id
    @ManyToOne
    @JoinColumn(name = "post_id", referencedColumnName = "post_id", nullable = false)  // 외래 키와 매핑
    private PostsEntity postId;  // Post 엔티티와 연관 관계 설정

    // 관심사 ID (외래키로 InterestEntity와 연관)
    @Id
    @ManyToOne
    @JoinColumn(name = "interest_id", referencedColumnName = "interest_id", nullable = false)  // 외래 키와 매핑
    private InterestEntity interestId;  // Interest 엔티티와 연관 관계 설정
}