package com.sulomon.web.entity;

import jakarta.persistence.Entity;
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
@Table(name = "post")
public class PostInterestEntity {

    @Id
    @ManyToOne
    @JoinColumn(name = "post_id", referencedColumnName = "post_id")  // 외래 키와 매핑
    PostsEntity postId;  // Post 엔티티와 연관 관계 설정

    @Id
    @ManyToOne
    @JoinColumn(name = "interest_id", referencedColumnName = "interest_id")  // 외래 키와 매핑
    InterestEntity interestId;  // Interest 엔티티와 연관 관계 설정

    @ManyToMany(mappedBy = "interests")
    private Set<PostsEntity> posts = new HashSet<>();
}

/*
-- 게시글과 관심사 간의 다대다 관계 테이블
CREATE TABLE post_interests (
    post_id INT NOT NULL,                      -- 게시글 ID (posts 테이블과 연결)
    interest_id INT NOT NULL,                  -- 관심사 ID (interests 테이블과 연결)
    PRIMARY KEY (post_id, interest_id),        -- 복합 기본 키로 설정 (각 게시글-관심사 쌍은 유일)
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE, -- posts 테이블의 post_id 참조
    FOREIGN KEY (interest_id) REFERENCES interests(interest_id) ON DELETE CASCADE -- interests 테이블의 interest_id 참조
);
 */