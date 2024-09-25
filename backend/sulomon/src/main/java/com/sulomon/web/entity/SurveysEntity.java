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
@Table(name = "surveys")
public class SurveysEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "survey_id")
    private int surveyId;

    // 설문조사 작성자 (users 테이블과 연관)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_num", nullable = false)
    private UserEntity user;

    // 설문조사 제목 (VARCHAR 255)
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

    public enum FormType {
        GOOGLE_FORM, SITE_FORM
    }

    public enum SurveyStatus {
        DRAFT, ACTIVE, COMPLETED, CLOSED, DELETED
    }


}
