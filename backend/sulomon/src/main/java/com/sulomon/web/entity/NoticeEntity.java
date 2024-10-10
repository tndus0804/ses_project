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

    // 공지 생성 시 생성 시간과 수정 시간을 설정
    @PrePersist
    public void prePersist() {
        if(content == null) this.content = "추후 수정 예정입니다.";
        this.createdAt = LocalDateTime.now(); // 처음 저장할 때 생성 시간 설정
        this.updatedAt = LocalDateTime.now(); // 처음 저장할 때 수정 시간도 동일하게 설정
    }

    // 공지 수정 시 수정 시간을 현재로 갱신
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now(); // 업데이트할 때마다 수정 시간을 현재로 갱신
    }
}
