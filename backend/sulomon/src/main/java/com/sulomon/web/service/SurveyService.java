package com.sulomon.web.service;

import java.util.List;

import com.sulomon.web.dto.SurveyDTO;
import com.sulomon.web.dto.SurveyQuestionDTO;
import com.sulomon.web.dto.SurveyResponseDTO;
import com.sulomon.web.entity.SurveyEntity;
import com.sulomon.web.security.AuthenticatedUser;

public interface SurveyService {
	// 설문조사 등록
	SurveyEntity writeSurvey(SurveyDTO surveyDTO, String username);
	// 설문조사 임시 저장
	void tempWriteSurvey(SurveyDTO surveyDTO, AuthenticatedUser user);
	// 설문조사 삭제
	void deleteSurvey(int surveyNum, AuthenticatedUser user);
	
	// 설문조사 질문 항목 등록
	void writeSurveyQuestion(List<SurveyQuestionDTO> questionDTOs, SurveyEntity surveyEntity);
	
	// 설문조사 질문 응답 등록
	void responseSurveyQuestion(SurveyResponseDTO responseDTO, String username);
	
	// 특정 사용자가 작성한 전체 설문조사 조회
	List<SurveyDTO> selectAll(String username);
	
	// 설문조사 세부사항
	SurveyDTO getSurveyDetail(int surveyNum);
	// 설문조사 질문 조회
	List<SurveyQuestionDTO> getSurveyQuestion(int surveyNum);
	
	// 설문조사 결과
	void getSurveyResult(int surveyNum);
}
