package com.sulomon.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SurveyResponseDTO {

    private Integer responseId;      // 응답 고유 ID
    private Integer surveyId;        // 설문조사 ID
    private Integer userNum;         // 사용자 ID
    private String responses;        // 응답 내용 (JSON 형식)
    private LocalDateTime createdAt; // 응답 생성 시간
}