package com.sulomon.web.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sulomon.web.dto.SurveyDTO;
import com.sulomon.web.dto.SurveyQuestionDTO;
import com.sulomon.web.dto.SurveyResponseDTO;
import com.sulomon.web.entity.SurveyEntity;
import com.sulomon.web.security.JwtUtil;
import com.sulomon.web.service.SurveyService;

// 설문조사 생성, 수정, 조회, 삭제 및 설문에 대한 질문과 응답 처리
// 설문조사와 관련된 상태 변경(예: 설문조사 활성화, 종료 등)
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/survey")
public class SurveysController {
	private final SurveyService surveyService;
	private final JwtUtil jwtUtil;
	ObjectMapper objectMapper = new ObjectMapper();
	
	/**
     * 설문조사 등록
     */
    @PostMapping("writeSurvey")
    public ResponseEntity<Map<String, String>> writeSurvey(
    			@RequestBody Map<String, Object> requestData
    		) {
    	Map<String, String> response = new HashMap<>();
    	
    	SurveyDTO surveyDTO = objectMapper.convertValue(requestData.get("surveyDTO"), SurveyDTO.class);
    	List<SurveyQuestionDTO> questionDTOs = objectMapper.convertValue(requestData.get("surveyQuestionDTOs"), new TypeReference<List<SurveyQuestionDTO>>() {});
    	
    	
    	//token
    	String token = (String) requestData.get("token");
    	String username = jwtUtil.extractUsername(token);
    	
    	// 날짜 가져오기
    	String startDateString = (String) requestData.get("startDate");
    	if (!startDateString.equals("")) {
    		LocalDateTime startDate = LocalDateTime.parse(startDateString + "T00:00:00");
    		surveyDTO.setStartDate(startDate);
    	}
    	
    	String endDateString = (String) requestData.get("endDate");
    	if (!endDateString.equals("")) {
    		LocalDateTime endDate = LocalDateTime.parse(endDateString + "T00:00:00");
    		surveyDTO.setEndDate(endDate);
    	}
    	
    	// questionDTOs의 options 필드를 JSON으로 변환
    	for (SurveyQuestionDTO question : questionDTOs) {
    		try {
				String jsonOptions = objectMapper.writeValueAsString(question.getOptions());
				question.setOptions(jsonOptions);
				log.debug("JSON 변환된 options: {}", jsonOptions);
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
    	}

    	surveyDTO.setFormType("SITE_FORM");
    	log.debug("넘어온 surveyDTO: {}", surveyDTO); 
    	log.debug("넘어온 questionDTOs: {}", questionDTOs);
//    	log.debug("options:" );
    	log.debug("유저: {}", username);
    	
//    	 surveyDTO ==> DB에 등록
    	SurveyEntity surveyEntity =  surveyService.writeSurvey(surveyDTO, username);
    	log.debug("surveyDTO 등록 완료");
//    	 quesionDTOs ==> DB에 등록
    	surveyService.writeSurveyQuestion(questionDTOs, surveyEntity);
    	response.put("message", "설문조사가 성공적으로 제출되었습니다.");
    	return ResponseEntity.ok(response);
    }

    /**
     * 설문조사 삭제
     */
    @PostMapping("deleteSurvey")
    public void deleteSurvey() {
    	
    	return;
    }
    
    /**
     * 설문조사 상세페이지 비동기 요청
     * URL 예시: http://localhost:9996/web/api/survey/getSurveyDetail?id=1
     * 
     */
    @GetMapping("getSurveyDetail/{id}")
    public SurveyDTO getSurveyDetail(
    			@RequestParam(value = "surveyNum") int surveyNum
    		) {
        SurveyDTO surveyDTO = surveyService.getSurveyDetail(surveyNum);
        List<SurveyQuestionDTO> dtoList = surveyService.getSurveyQuestion(surveyNum);
        
        return surveyDTO;
    }

    /**
     * 특정 설문조사 조회
     */
    @GetMapping("getSurvey/{id}")
    public ResponseEntity<Map<String, Object>> getSurvey(
    			@PathVariable("id") int surveyId
    		) {
    	Map<String, Object> responseData = new HashMap<>();
    	
    	// surveyDTO
    	SurveyDTO surveyDTO = surveyService.getSurveyDetail(surveyId);
    	// surveyQuestionDTOs
    	List<SurveyQuestionDTO> dtoList = surveyService.getSurveyQuestion(surveyId);
    	
    	// response에 추가
    	responseData.put("surveyDTO", surveyDTO);
    	responseData.put("surveyQuestionDTOs", dtoList);
    	log.debug("sdfasdf:{}", dtoList);
    	return ResponseEntity.ok(responseData);
    }
    
    /**
     * 특정 사용자가 작성한 모드 설문조사 조회
     */
    @PostMapping("selectAll")
    public ResponseEntity<Map<String, Object>> selectAll(
    			@RequestBody Map<String, Object> requestData
    		) {
    	Map<String, Object> response = new HashMap<>();
    	
    	// token
    	String token = (String) requestData.get("token");
    	String username = jwtUtil.extractUsername(token);
    	
    	List<SurveyDTO> surveyList = surveyService.selectAll(username);
    	
//    	try {
//    		String jsonSurveyList = objectMapper.writeValueAsString(surveyList);
//    		response.put("surveys", jsonSurveyList);
//    	} catch (JsonProcessingException e) {
//    		e.printStackTrace();
//    	}

    	response.put("surveys", surveyList);
    	return ResponseEntity.ok(response);
    }
    
    @PostMapping("responseSurveyQuestion")
    public ResponseEntity<String> responseSurveyQuestion(
    			@RequestBody Map<String, Object> requestData
    		) {
    	
    	
    	// token
    	String token = (String) requestData.get("token");
    	String username = jwtUtil.extractUsername(token);
    	
    	SurveyResponseDTO responseDTO = objectMapper.convertValue(requestData.get("responseDTO"), SurveyResponseDTO.class) ;
    	
    	surveyService.responseSurveyQuestion(responseDTO, username);
    	return ResponseEntity.status(HttpStatus.CREATED).body("설문이 성공적으로 생성되었습니다."); // 201 Created
    }

    /**
     * 설문조사 결과 비동기 요청
     * -- sheetJS -> import
     * import * as XLSL from 'xlsx';
     * 
     * return -> 결과
     */
    @GetMapping("getSurveyResult")
    public void getSurveyResult(
    			@RequestParam("surveyNum") int surveyNum
    		) {
    	
    	
    	
    	return;
    }
}
