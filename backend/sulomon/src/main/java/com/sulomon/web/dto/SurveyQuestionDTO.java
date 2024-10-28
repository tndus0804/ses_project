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
    private String questionType;      // 질문 유형 (MULTIPLE_CHOICE, TEXT, RATING)
    private Object options;           // JSON 데이터를 담을 수 있도록 변경


}