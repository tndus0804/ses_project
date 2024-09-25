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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "survey_questions")
public class SurveyQuestionEntity {

    // 질문 ID (AUTO_INCREMENT, PRIMARY KEY)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Integer questionId;

    // 설문조사와의 연관관계 (ManyToOne, 지연 로딩)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id", nullable = false)
    private SurveysEntity surveys; // 설문조사와 연관된 SurveysEntity

    // 질문 텍스트 (TEXT, NOT NULL)
    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText; // 질문 내용

    // 질문 유형 (ENUM, NOT NULL)
    @Enumerated(EnumType.STRING)
    @Column(name = "question_type", nullable = false)
    private QuestionType questionType; // 질문 유형 (MULTIPLE_CHOICE, TEXT, RATING)

    // 옵션 (JSON 형식으로 저장)
    @Column(name = "options", columnDefinition = "JSON")
    private String options; // 선택지 또는 추가 옵션

    // 질문 유형을 정의하는 Enum (MULTIPLE_CHOICE, TEXT, RATING)
    public enum QuestionType {
        MULTIPLE_CHOICE,  // 객관식 질문
        TEXT,             // 텍스트 입력 질문
        RATING            // 평점 질문
    }

}