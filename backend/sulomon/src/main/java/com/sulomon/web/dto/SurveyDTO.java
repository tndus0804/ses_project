package com.sulomon.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SurveyDTO {

    private Integer surveyId;        // 설문조사 ID
    private UUID userNum;            // 설문조사 작성자 ID
    private String title;            // 설문조사 제목
    private String description;      // 설문조사 설명
    private String formType;         // 설문조사 폼 유형 (GOOGLE_FORM, SITE_FORM)
    private int points;              // 참여자에게 지급할 포인트
    private int participants;        // 참여자 수
    private String status;           // 설문조사 상태 (DRAFT, ACTIVE, COMPLETED, CLOSED, DELETED)
    private LocalDateTime startDate; // 설문조사 시작 시간
    private LocalDateTime endDate;   // 설문조사 마감 시간
    private LocalDateTime createdAt; // 설문조사 생성 시간
    private LocalDateTime updatedAt; // 설문조사 수정 시간

}