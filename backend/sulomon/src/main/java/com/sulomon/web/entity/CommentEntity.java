package com.sulomon.web.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
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

    // 댓글 ID (AUTO_INCREMENT, PRIMARY KEY)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer commentId;

    // 게시글과 연관된 엔티티 (ManyToOne 관계)
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private PostsEntity postId; // 게시글과 연관된 PostsEntity

    // 사용자와 연관된 엔티티, 사용자 삭제 시 NULL 처리 (ManyToOne 관계)
    @ManyToOne
    @JoinColumn(name = "user_num", nullable = true)
    private UserEntity userNum; // 사용자와 연관된 UserEntity

    // 댓글 작성자 이름 (계정 삭제 후에도 유지, VARCHAR 100, NOT NULL)
    @Column(name = "username", nullable = false, length = 100)
    private String username; // 댓글 작성자 이름

    // 댓글 내용 (TEXT, NOT NULL)
    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content; // 댓글 내용

    // 생성 날짜 (DATETIME, 기본값 CURRENT_TIMESTAMP)
    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now(); // 댓글 생성 시간

    // 댓글 상태 (ENUM, 기본값 ACTIVE)
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private CommentStatus status = CommentStatus.ACTIVE; // 댓글 상태 (ACTIVE, DELETED)

    // 댓글 저장 시 생성 날짜 설정
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now(); // 처음 저장할 때 생성 시간 설정
    }

    // 댓글 상태를 정의하는 ENUM (ACTIVE, DELETED)
    public enum CommentStatus {
        ACTIVE, DELETED
    }
}