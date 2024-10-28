package com.sulomon.web.service;

import com.sulomon.auth.entity.UserEntity;
import com.sulomon.web.dto.SurveyDTO;
import com.sulomon.web.dto.SurveyQuestionDTO;
import com.sulomon.web.dto.SurveyResponseDTO;
import com.sulomon.web.entity.SurveyEntity;
import com.sulomon.web.entity.SurveyQuestionEntity;
import com.sulomon.web.entity.SurveyResponseEntity;
import com.sulomon.web.repository.SurveyQuestionRepository;
//import com.sulomon.web.entity.UserEntity;
import com.sulomon.web.repository.SurveyRepository;
import com.sulomon.web.repository.SurveyResponseRepository;
import com.sulomon.web.repository.UserRepository;
import com.sulomon.web.security.AuthenticatedUser;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class SurveyServiceImpl implements SurveyService {

	private final SurveyRepository surveyRepository;
	private final UserRepository userRepository;
	private final SurveyQuestionRepository surveyQuestionRepository;
	private final SurveyResponseRepository surveyResponseRepository;
	
	/**
	 * 설문조사 등록
	 */
	@Override
	public SurveyEntity writeSurvey(SurveyDTO surveyDTO, String username) {
		UserEntity userEntity = userRepository.findByUserId(username)
				.orElseThrow(() -> new EntityNotFoundException("해당 유저가 없습니다."));
		SurveyEntity surveyEntity = SurveyEntity.builder()
				.user(userEntity)
				.title(surveyDTO.getTitle())
				.description(surveyDTO.getDescription())
				.formType(surveyDTO.getFormType())
				.points(surveyDTO.getPoints())
				.status("active")
				.startDate(surveyDTO.getStartDate())
				.endDate(surveyDTO.getEndDate())
				.build();
		surveyRepository.save(surveyEntity);
		return surveyEntity;
	}
	
	/**
	 * 설문조사 임시 저장
	 */
	@Override
	public void tempWriteSurvey(SurveyDTO surveyDTO, AuthenticatedUser user) {
		UserEntity userEntity = userRepository.findByUserId(user.getUsername())
				.orElseThrow(() -> new EntityNotFoundException("해당 유저가 없습니다."));
		SurveyEntity surveyEntity = SurveyEntity.builder()
				.user(userEntity)
				.title(surveyDTO.getTitle())
				.description(surveyDTO.getDescription())
				.formType(surveyDTO.getFormType())
				.points(surveyDTO.getPoints())
				.status("draft")
				.createdAt(null)
				.updatedAt(null)
				.build();
		surveyRepository.save(surveyEntity);
	}
	
	/**
	 * 설문조사 삭제
	 */
	@Override
	public void deleteSurvey(int surveyNum, AuthenticatedUser user) {
		// TODO Auto-generated method stub
		
	}
	
	/**
	 * 특정 사용자가 작성한 설문조사 전체 조회
	 */
	public List<SurveyDTO> selectAll(String username) {
		List<SurveyEntity> entityList = surveyRepository.findAll();
		List<SurveyDTO> dtoList = new ArrayList<>();
		
		for (SurveyEntity entity : entityList) {
			if (!(entity.getUser().getUserId().equals(username)))
				continue;
			SurveyDTO dto = SurveyDTO.builder()
							.surveyId(entity.getSurveyId())
							.userNum(entity.getUser().getUserNum())
							.title(entity.getTitle())
							.description(entity.getDescription())
							.points(entity.getPoints())
							.participants(entity.getParticipants())
							.startDate(entity.getStartDate())
							.endDate(entity.getEndDate())
							.createdAt(entity.getCreatedAt())
							.updatedAt(entity.getUpdatedAt())
							.build();
			dtoList.add(dto);
		}
		
		return dtoList;
	}
	
	/**
	 * 설문조사 질문 항목 등록
	 */
	@Override
	public void writeSurveyQuestion(List<SurveyQuestionDTO> questionDTOs, SurveyEntity surveyEntity) {
		
		for (SurveyQuestionDTO dto : questionDTOs ) {
			SurveyQuestionEntity entity = SurveyQuestionEntity.builder()
					.survey(surveyEntity)
					.questionText(dto.getQuestionText())
					.questionType(dto.getQuestionType())
					.options(dto.getOptions())
					.build();
			
			surveyQuestionRepository.save(entity);
			log.debug("surveyQuestionEntity 생성완");
		}
	}
	
	/**
	 * 설문조사 질문 응답 등록
	 */
	public void responseSurveyQuestion(SurveyResponseDTO responseDTO, String username) {
		UserEntity userEntity = userRepository.findByUserId(username)
				.orElseThrow(() -> new EntityNotFoundException("해당 유저가 없습니다."));
		SurveyEntity surveyEntity = surveyRepository.findById(responseDTO.getSurveyId())
				.orElseThrow(() -> new EntityNotFoundException("해당 survey가 없습니다."));
		SurveyResponseEntity responseEntity = SurveyResponseEntity.builder()
								.survey(surveyEntity)
								.user(userEntity)
								.responses(responseDTO.getResponses())
								.build();
		surveyResponseRepository.save(responseEntity);
	}

	/**
	 * 설문조사 상세사항
	 */
	@Override
	public SurveyDTO getSurveyDetail(int surveyNum) {
		SurveyEntity surveyEntity = surveyRepository.findById(surveyNum)
					.orElseThrow(() -> new EntityNotFoundException("존재하지 않는 설문조사 입니다."));
		
		SurveyDTO surveyDTO = SurveyDTO.builder()
					.surveyId(surveyEntity.getSurveyId())
					.userNum(surveyEntity.getUser().getUserNum())
					.title(surveyEntity.getTitle())
					.description(surveyEntity.getDescription())
					.formType(surveyEntity.getFormType())
					.points(surveyEntity.getPoints())
					.status(surveyEntity.getStatus())
					.createdAt(surveyEntity.getCreatedAt())
					.updatedAt(surveyEntity.getUpdatedAt())
					.build();
		return surveyDTO;
	}
	
	/**
	 * 특정 설문조사 질문 조회
	 */
	public List<SurveyQuestionDTO> getSurveyQuestion(int surveyNum) {
		SurveyEntity surveyEntity = surveyRepository.findById(surveyNum)
				.orElseThrow(() -> new EntityNotFoundException("존재하지 않는 설문조사 입니다."));
		
		List<SurveyQuestionEntity> entityList = surveyQuestionRepository.findBySurvey(surveyEntity);
		List<SurveyQuestionDTO> dtoList = new ArrayList<>();
		
		for (SurveyQuestionEntity entity : entityList) {
			SurveyQuestionDTO dto = SurveyQuestionDTO.builder()
					.questionId(entity.getQuestionId())
					.surveyId(entity.getSurvey().getSurveyId())
					.questionText(entity.getQuestionText())
					.questionType(entity.getQuestionType())
					.options(entity.getOptions())
					.build();
			dtoList.add(dto);
		}
		
		return dtoList;
	}
	/**
	 * 설문조사 결과
	 */
	public void getSurveyResult(int surveyNum) {
		SurveyEntity surveyEntity = surveyRepository.findById(surveyNum)
					.orElseThrow(() -> new EntityNotFoundException("존재하지 않는 설문조사 입니다."));
		SurveyDTO surveyDTO = SurveyDTO.builder()
					.userNum(surveyEntity.getUser().getUserNum())
					.title(surveyEntity.getTitle())
					.description(surveyEntity.getDescription())
					.formType(surveyEntity.getFormType())
					.points(surveyEntity.getPoints())
					.status(surveyEntity.getStatus())
					.createdAt(surveyEntity.getCreatedAt())
					.updatedAt(surveyEntity.getUpdatedAt())
					.build();
		return; 
	}
	
	

	

}
