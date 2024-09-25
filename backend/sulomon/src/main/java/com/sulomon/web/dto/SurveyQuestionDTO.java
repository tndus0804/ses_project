package com.sulomon.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SurveyQuestionDTO {

    private Integer questionId;       // 질문 ID
    private Integer surveyId;         // 설문조사 ID
    private String questionText;      // 질문 내용
    private QuestionType questionType;// 질문 유형
    private String options;           // 선택지 또는 옵션 (JSON)

    // 질문 유형을 정의하는 ENUM (MULTIPLE_CHOICE, TEXT, RATING)
    public enum QuestionType {
        MULTIPLE_CHOICE,  // 객관식 질문
        TEXT,             // 텍스트 입력 질문
        RATING            // 평점 질문
    }

}