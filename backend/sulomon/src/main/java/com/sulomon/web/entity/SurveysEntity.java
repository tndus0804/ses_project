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

    // 설문조사 폼 타입 (ENUM, 기본값 SITE_FORM)
    @Enumerated(EnumType.STRING)
    @Column(name = "form_type", nullable = false)
    private FormType formType = FormType.SITE_FORM; // 폼 타입 (GOOGLE_FORM, SITE_FORM)

    // 참여자에게 지급할 포인트 (기본값 0)
    @Column(name = "points", nullable = false)
    private Integer points = 0; // 참여자에게 지급할 포인트

    // 설문조사 상태 (ENUM, 기본값 DRAFT)
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private SurveyStatus status = SurveyStatus.DRAFT; // 설문 상태 (DRAFT, ACTIVE, COMPLETED, CLOSED, DELETED)

    // 설문조사 생성 시간 (DATETIME, NOT NULL, 업데이트 불가)
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now(); // 설문조사 생성 시간

    // 설문조사 수정 시간 (DATETIME, NOT NULL)
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now(); // 설문조사 수정 시간

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now(); // 수정할 때마다 수정 시간을 현재 시간으로 갱신
    }

    // 설문조사 폼 유형을 정의하는 ENUM (GOOGLE_FORM, SITE_FORM)
    public enum FormType {
        GOOGLE_FORM, SITE_FORM
    }

    // 설문조사 상태를 정의하는 ENUM (DRAFT, ACTIVE, COMPLETED, CLOSED, DELETED)
    public enum SurveyStatus {
        DRAFT, ACTIVE, COMPLETED, CLOSED, DELETED
    }
}