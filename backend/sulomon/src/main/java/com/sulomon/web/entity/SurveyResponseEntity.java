package com.sulomon.web.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
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
@Table(name = "survey_response")
public class SurveyResponseEntity {

    // 응답 고유 ID (AUTO_INCREMENT, PRIMARY KEY)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "response_id")
    private Integer responseId;

    // 설문조사 ID (Surveys 테이블과 연관)
    @ManyToOne
    @JoinColumn(name = "survey_id", nullable = false)
    private SurveyEntity survey; // 설문조사와 연관된 SurveysEntity

    // 응답한 사용자 ID (Users 테이블과 연관)
    @ManyToOne
    @JoinColumn(name = "user_num", nullable = false)
    private UserEntity user; // 응답한 사용자와 연관된 UserEntity

    // 응답 내용 (JSON, NOT NULL)
    @Column(name = "responses", nullable = false, columnDefinition = "JSON")
    private String responses; // 응답 내용 (JSON 형식으로 저장)

    // 응답 생성 시간 (DATETIME, 기본값 CURRENT_TIMESTAMP)
    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now(); // 응답 생성 시간

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now(); // 응답이 처음 저장될 때 생성 시간 설정
    }
}