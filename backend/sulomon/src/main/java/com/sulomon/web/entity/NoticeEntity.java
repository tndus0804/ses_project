package com.sulomon.web.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "notice")
public class NoticeEntity {

    // 공지사항 ID (AUTO_INCREMENT, PRIMARY KEY)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private Integer noticeId;

    // 관리자 (User 테이블과 연관)
    @ManyToOne
    @JoinColumn(name = "admin_num", nullable = false)
    private UserEntity adminNum; // 관리자와 연관된 User 엔티티

    // 공지사항 제목 (VARCHAR 255, NOT NULL)
    @Column(name = "title", nullable = false, length = 255)
    private String title;

    // 공지사항 내용 (TEXT, NOT NULL)
    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    // 공지 생성 시간 (DATETIME, 기본값 CURRENT_TIMESTAMP)
    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt; // 공지 생성 시간

    // 공지 수정 시간 (DATETIME, 기본값 CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)
    @Column(name = "updated_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt; // 공지 수정 시간

}
