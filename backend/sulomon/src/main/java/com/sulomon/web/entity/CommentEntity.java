package com.sulomon.web.entity;

import com.sulomon.auth.entity.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "comment")
public class CommentEntity {

    // 댓글 ID (AUTO_INCREMENT, PRIMARY KEY)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer commentId;

    // 게시글과 연관된 엔티티 (ManyToOne 관계)
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private PostEntity post; // 게시글과 연관된 PostEntity

    // 사용자와 연관된 엔티티, 사용자 삭제 시 NULL 처리 (ManyToOne 관계)
    @ManyToOne
    @JoinColumn(name = "user_num", nullable = true)
    private UserEntity user; // 사용자와 연관된 UserEntity

    // 댓글 작성자 이름 (계정 삭제 후에도 유지, VARCHAR 100, NOT NULL)
    @Column(name = "username", nullable = false, length = 100)
    private String username; // 댓글 작성자 이름

    // 댓글 내용 (TEXT, NOT NULL)
    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content; // 댓글 내용

    // 생성 날짜 (DATETIME, 기본값 CURRENT_TIMESTAMP)
    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt; // 댓글 생성 시간

    // 댓글 상태 (VARCHAR로 변경, 기본값 'active')
    @Column(name = "status", nullable = false, length = 10, columnDefinition = "VARCHAR(10) DEFAULT 'active'")
    private String status; // 댓글 상태 ('active', 'deleted')

    @PrePersist
    public void prePersist() {
        if(content == null) this.content = "좋은 설문이에요."; // 댓글 내용
        this.createdAt = LocalDateTime.now(); // 처음 저장할 때 생성 시간 설정
        if(status == null) this.status = "active"; // 댓글 상태
    }
}