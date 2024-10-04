package com.sulomon.web.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PreUpdate;
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
@Table(name = "post")
public class PostEntity {

    // 게시글 ID (AUTO_INCREMENT, PRIMARY KEY)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Integer postId;

    // 작성자 (users 테이블과 연관)
    @ManyToOne
    @JoinColumn(name = "user_num", nullable = false)
    private UserEntity user; // User 엔티티와 연관

    // 제목 (VARCHAR 255, NOT NULL)
    @Column(name = "title", nullable = false)
    private String title;

    // 게시글 내용 (TEXT, NOT NULL)
    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    // 카테고리 (VARCHAR 50)
    @Column(name = "category", length = 50)
    private String category;

    // 조회수 (INT, NOT NULL, DEFAULT 0)
    @Column(name = "views", nullable = false)
    private Integer views = 0;

    // 이미지 파일 경로 (VARCHAR 255)
    @Column(name = "image_path")
    private String imagePath;

    // 공개 / 비공개 상태 (VARCHAR 10, NOT NULL)
    @Column(name = "visibility", length = 10, nullable = false)
    private String visibility = "visible"; // 기본값은 'visible'

    // 비공개 게시글의 암호 (VARCHAR 255)
    @Column(name = "private_password")
    private String privatePassword;

    // 게시글 생성 시간 (DATETIME, DEFAULT CURRENT_TIMESTAMP)
    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now();

    // 게시글 수정 시간 (DATETIME, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)
    @Column(name = "updated_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // 게시글 상태 (VARCHAR 10, NOT NULL)
    @Column(name = "status", length = 10, nullable = false)
    private String status = "active"; // 기본값은 'active'

    // 게시글 수정 시 수정 시간을 갱신하는 메서드
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now(); // 수정할 때마다 현재 시간으로 갱신
    }
}