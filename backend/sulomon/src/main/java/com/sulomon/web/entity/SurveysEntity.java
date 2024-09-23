package com.sulomon.web.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
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
@Table(name = "surveys")
public class SurveysEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "survey_id")
    String surveyId;

    // 설문조사 작성자 (users 테이블과 연관)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_num", nullable = false)
    private UserEntity user;

    // 설문조사 제목
    @Column(name = "title", nullable = false)
    private String title;

    // 설문조사 내용
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    // 폼 타입 (기본값 'site_form')
    @Enumerated(EnumType.STRING)
    @Column(name = "form_type", nullable = false)
    private FormType formType = FormType.SITE_FORM;

    // 참여자에게 지급할 포인트
    @Column(name = "points", nullable = false)
    private int points = 0;

    // 설문조사 상태 (기본값 'draft')
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private SurveyStatus status = SurveyStatus.DRAFT;

    // 설문조사 생성 시간
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // 설문조사 수정 시간
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now(); // 수정할 때마다 현재 시간으로 갱신
    }

    // Getters, Setters, Constructors

    public enum FormType {
        GOOGLE_FORM, SITE_FORM
    }

    public enum SurveyStatus {
        DRAFT, ACTIVE, COMPLETED, CLOSED, DELETED
    }
    //
    /*
    survey_id INT AUTO_INCREMENT PRIMARY KEY, -- 설문조사 고유 ID
    user_num INT NOT NULL,                     -- 설문조사 작성자 번호 (users 테이블과 연결)
    title VARCHAR(255) NOT NULL,              -- 설문조사 제목
    description TEXT,                         -- 설문조사 내용
    form_type ENUM('google_form', 'site_form') DEFAULT 'site_form', -- 폼 타입 ('google_form': 구글 폼, 'site_form': 자체 폼)
    points INT DEFAULT 0,                     -- 참여자에게 지급할 포인트
    status ENUM('draft', 'active', 'completed', 'closed', 'deleted') DEFAULT 'draft', -- 설문조사 상태
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 설문조사 생성 시간
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 설문조사 수정 시간
    FOREIGN KEY (user_num) REFERENCES users(user_num) -- users 테이블의 user_num과 연결
     */


}
