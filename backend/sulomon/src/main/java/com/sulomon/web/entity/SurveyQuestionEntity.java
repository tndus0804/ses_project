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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    String questionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id", nullable = false)
    SurveysEntity surveys;

    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    @Enumerated(EnumType.STRING)
    @Column(name = "question_type", nullable = false)
    private QuestionType questionType;

    @Column(name = "options", columnDefinition = "JSON")
    private String options;

    // 질문 유형에 대한 Enum
    public enum QuestionType {
        MULTIPLE_CHOICE,
        TEXT,
        RATING
    }
    /*


    -- 설문조사 질문 테이블
CREATE TABLE survey_questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY, -- 질문 고유 ID
    survey_id INT NOT NULL,                    -- 설문조사 ID (surveys 테이블과 연결)
    question_text TEXT NOT NULL,               -- 질문 내용
    question_type ENUM('multiple_choice', 'text', 'rating') NOT NULL, -- 질문 유형 ('multiple_choice': 객관식, 'text': 서술형, 'rating': 평점)
    options JSON,                              -- 선택지 (객관식 질문일 경우 JSON 형식으로 저장)
    FOREIGN KEY (survey_id) REFERENCES surveys(survey_id) -- surveys 테이블의 survey_id를 참조하는 외래 키
);
     */

}
