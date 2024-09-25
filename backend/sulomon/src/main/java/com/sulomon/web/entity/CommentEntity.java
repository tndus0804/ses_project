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
@Table(name = "comments")
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    int commentId;

    // 게시글과 연관된 엔티티
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    PostsEntity postId;

    // 사용자와 연관된 엔티티, 삭제 시 NULL 처리
    @ManyToOne
    @JoinColumn(name = "user_num", nullable = true)
    UserEntity userNum;

    // 댓글 작성자 이름 (계정 삭제 후에도 유지)
    @Column(name = "username", nullable = false, length = 100)
    String username;

    // 댓글 내용
    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    String content;

    // 생성 날짜
    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    LocalDateTime createdAt = LocalDateTime.now();

    // 댓글 상태
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    CommentStatus status = CommentStatus.ACTIVE;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now(); // 처음 저장할 때 시간 설정
    }

    public enum CommentStatus {
        ACTIVE, DELETED
    }
}
