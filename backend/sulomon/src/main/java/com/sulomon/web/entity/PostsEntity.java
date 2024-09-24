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
@Table(name = "posts")
public class PostsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    int postId;

    @ManyToOne
    @JoinColumn(name = "user_num", nullable = false)
    UserEntity userNum; // User 엔티티와 연관

    @Column(name = "title", nullable = false)
    String title;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    String content;

    @Column(name = "category", length = 50)
    String category;

    @Column(name = "views", nullable = false, columnDefinition = "INT DEFAULT 0")
    int views = 0;

    @Column(name = "image_path")
    String imagePath;

    @Column(name = "visibility", nullable = false, columnDefinition = "ENUM('visible', 'hidden') DEFAULT 'visible'")
    String visibility = "visible";

    @Column(name = "private_password")
    String privatePassword;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "status", nullable = false, columnDefinition = "ENUM('active', 'deleted') DEFAULT 'active'")
    String status = "active";

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now(); // 수정할 때마다 현재 시간으로 갱신
    }
}
