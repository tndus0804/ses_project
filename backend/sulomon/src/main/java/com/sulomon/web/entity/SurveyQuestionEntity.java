package com.sulomon.web.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "survey_question")
public class SurveyQuestionEntity {

    // 질문 ID (AUTO_INCREMENT, PRIMARY KEY)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Integer questionId;

    // 설문조사와의 연관관계 (ManyToOne, 지연 로딩)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id", nullable = false)
    private SurveyEntity survey; // 설문조사와 연관된 SurveysEntity

    // 질문 텍스트 (TEXT, NOT NULL)
    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText; // 질문 내용

    // 질문 유형 (VARCHAR 20, NOT NULL)
    @Column(name = "question_type", length = 20, nullable = false)
    private String questionType; // 질문 유형 (multiple_choice, text, rating)

    // 옵션 (JSON 형식으로 저장)
    @Column(name = "options", columnDefinition = "JSON")
    private Object options; // 선택지 또는 추가 옵션

}