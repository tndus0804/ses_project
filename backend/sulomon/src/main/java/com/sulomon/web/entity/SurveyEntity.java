package com.sulomon.web.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "survey")
public class SurveyEntity {

    // 설문조사 ID (AUTO_INCREMENT, PRIMARY KEY)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "survey_id")
    private Integer surveyId;

    // 설문조사 작성자 (users 테이블과 연관, ManyToOne, 지연 로딩)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_num", nullable = false)
    private UserEntity user; // 설문조사 작성자와 연관된 사용자

    // 설문조사 제목 (VARCHAR 255, NOT NULL)
    @Column(name = "title", nullable = false)
    private String title; // 설문조사 제목

    // 설문조사 내용 (TEXT)
    @Column(name = "description", columnDefinition = "TEXT")
    private String description; // 설문조사 설명

    // 설문조사 폼 타입 (VARCHAR 20, 기본값 'site_form')
    @Column(name = "form_type", length = 20, nullable = false)
    private String formType; // (google_form, site_form)

    // 참여자에게 지급할 포인트 (기본값 0)
    @Column(name = "points", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer points; // 참여자에게 지급할 포인트

    // 설문조사 상태 (VARCHAR 20, 기본값 'draft')
    @Column(name = "status", length = 20, nullable = false, columnDefinition = "VARCHAR(20) DEFAULT 'active'")
    private String status; // 설문 상태 (draft, active, completed, closed, deleted)

    // 설문조사 생성 시간 (DATETIME, NOT NULL, 업데이트 불가)
    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt; // 설문조사 생성 시간

    // 설문조사 수정 시간 (DATETIME, NOT NULL)
    @Column(name = "updated_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt; // 설문조사 수정 시간

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now(); // 처음 저장할 때 생성 시간 설정
        if(status == null) this.status = "active"; // 상태
    }
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now(); // 수정할 때마다 수정 시간을 현재 시간으로 갱신
    }

}