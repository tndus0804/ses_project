package com.sulomon.mypage.controller;

import com.sulomon.web.dto.SurveyDTO;
import com.sulomon.web.entity.SurveyEntity;
import com.sulomon.web.repository.SurveyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api")
public class MysurveyController {

    private final SurveyRepository surveyRepository;

    public MysurveyController(SurveyRepository surveyRepository) {
        this.surveyRepository = surveyRepository;
    }

//    // 모든 설문조사 목록을 가져오는 API
//    @GetMapping
//    public ResponseEntity<List<SurveyEntity>> getAllSurveys() {
//        List<SurveyEntity> surveys = surveyRepository.findAll();
//        return ResponseEntity.ok(surveys);
//    }

    // 특정 유저의 설문조사 목록을 가져오는 API (예: userId 기준으로)
    @GetMapping("/mysurveys")
    public ResponseEntity<List<SurveyDTO>> getMySurveys() {
        // 현재 인증된 사용자의 userId 가져오기
        String currentUserId = SecurityContextHolder.getContext().getAuthentication().getName();

        // 현재 사용자와 일치하는 설문조사만 필터링
        List<SurveyEntity> surveys = surveyRepository.findByUser_UserId(currentUserId);
        List<SurveyDTO> surveyDTOs = surveys.stream().map(survey ->
                SurveyDTO.builder()
                        .surveyId(survey.getSurveyId())                     // 설문조사 번호
                        .title(survey.getTitle())                           // 설문조사 제목
                        .points(survey.getPoints())                         // 설문조사 지급 포인트
                        .createdAt(survey.getStartDate())                   // 설문조사 시작 시간
                        .updatedAt(survey.getEndDate())                     // 설문조사 종료 시간
                        .participants(survey.getParticipants())             // 참여자 수
                        .build()
        ).collect(Collectors.toList());

        return ResponseEntity.ok(surveyDTOs);
    }
}