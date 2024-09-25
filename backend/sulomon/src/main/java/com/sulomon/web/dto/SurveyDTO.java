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
public class SurveyDTO {

    private Integer surveyId;        // 설문조사 ID
    private Integer userNum;         // 설문조사 작성자 ID
    private String title;            // 설문조사 제목
    private String description;      // 설문조사 설명
    private FormType formType;       // 설문조사 폼 유형
    private int points;              // 참여자에게 지급할 포인트
    private SurveyStatus status;     // 설문조사 상태
    private LocalDateTime createdAt; // 설문조사 생성 시간
    private LocalDateTime updatedAt; // 설문조사 수정 시간

    // 설문조사 폼 유형을 정의하는 ENUM (GOOGLE_FORM, SITE_FORM)
    public enum FormType {
        GOOGLE_FORM, SITE_FORM
    }

    // 설문조사 상태를 정의하는 ENUM (DRAFT, ACTIVE, COMPLETED, CLOSED, DELETED)
    public enum SurveyStatus {
        DRAFT, ACTIVE, COMPLETED, CLOSED, DELETED
    }
}