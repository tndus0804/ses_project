package com.sulomon.web.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sulomon.auth.entity.UserEntity;
import com.sulomon.web.dto.PostDTO;
import com.sulomon.web.entity.PostEntity;
import com.sulomon.web.entity.SurveyEntity;
import com.sulomon.web.repository.PostRepository;
import com.sulomon.web.repository.SurveyRepository;
import com.sulomon.web.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class PostServiceImpl implements PostService {
	
	private final PostRepository postRepository;
	private final UserRepository userRepository;
	private final SurveyRepository surveyRepository;
	
	/*
	 * 게시글 작성
	 **/
	@Override
	public void writePost(PostDTO postDTO, String username) {
		UserEntity userEntity = userRepository.findByUserId(username)
				.orElseThrow(() -> new EntityNotFoundException("해당 유저가 없습니다."));
		SurveyEntity surveyEntity = surveyRepository.findById(postDTO.getSurveyId())
				.orElseThrow(() -> new EntityNotFoundException("해당 설문조사가 없습니다."));
		PostEntity postEntity = PostEntity.builder()
				.user(userEntity)
				.title(postDTO.getTitle())
				.content(postDTO.getContent())
				.category(postDTO.getCategory())
				.views(postDTO.getViews())
				.imagePath(postDTO.getImagePath())
				.visibility("visible")
				.privatePassword(postDTO.getPrivatePassword())
				.createdAt(null)
				.updatedAt(null)
				.status("ACTIVE")
				.survey(surveyEntity)
				.build();
		postRepository.save(postEntity);
	}
	
	/*
	 * 게시글 수정
	 **/
	@Override
	public boolean updatePost(PostDTO postDTO, String username) {
		PostEntity postEntity = postRepository.findById(postDTO.getPostId())
				.orElseThrow(() -> new EntityNotFoundException("해당 게시물이 없습니다."));

		if ( postEntity.getUser().getUserId().equals(username) ) {
			// 현재 접속 유저와 글 작성자가 같으면
			postEntity.setTitle(postDTO.getTitle());
			postEntity.setContent(postDTO.getContent());
//			postEntity.setUpdatedAt(null); // 수정시간 업데이트
			return true;
		}
		return false;
	}
	
	/*
	 * 게시글 삭제
	 **/
	@Override
	public void deletePost(PostDTO postDTO, String username) {
		PostEntity postEntity = postRepository.findById(postDTO.getPostId())
				.orElseThrow(() -> new EntityNotFoundException("해당 게시물이 없습니다."));
		if ( postEntity.getUser().getUserId().equals(username) ) {
			// 현재 접속 유저와 글 작성자가 같으면
			postEntity.setStatus("deleted"); // 상태 업데이트 -> 삭제
		}
	}
	
	/*
	 * 게시글 조회
	 **/
	@Override
	public PostDTO getPost(int postNum) {
		PostEntity postEntity = postRepository.findById(postNum)
				.orElseThrow(() -> new EntityNotFoundException("해당 게시물이 없습니다."));
		
		PostDTO postDTO = PostDTO.builder()
				.postId(postNum)
				.userNum(postEntity.getUser().getUserNum())
				.title(postEntity.getTitle())
				.content(postEntity.getContent())
				.category(postEntity.getCategory())
				.views(postEntity.getViews())
				.imagePath(postEntity.getImagePath())
//				.visibility(postEntity.getVisibility())
				.createdAt(postEntity.getCreatedAt())
				.updatedAt(postEntity.getUpdatedAt())
//				.status(postEntity.getStatus())
				.surveyId(postEntity.getSurvey().getSurveyId())
				.build();
		return postDTO;
	}
	
	/**
	 * 전체 조회
	 */
	@Override
	public List<PostDTO> selectAll() {
		List<PostEntity> entityList = postRepository.findAll();
		List<PostDTO> dtoList = new ArrayList<>();
		
		for (PostEntity entity : entityList) {
			PostDTO dto = PostDTO.builder()
					.postId(entity.getPostId())
					.userNum(entity.getUser().getUserNum())
					.title(entity.getTitle())
					.content(entity.getContent())
					.views(entity.getViews())
					.createdAt(entity.getCreatedAt())
					.updatedAt(entity.getUpdatedAt())
					.status(entity.getStatus())
					.userName(entity.getUser().getName())
					.build();
			dtoList.add(dto);
		}
		
		return dtoList;
	}
	
	/**
	 * 게시글 검색
	 */
	@Override
	public List<PostDTO> searchPost(String keyword) {
		List<PostEntity> postEntities = postRepository.findByTitleLike("%"+keyword+"%");
		List<PostDTO> postDtos = new ArrayList<>();
		
		for (PostEntity entity : postEntities) {
			PostDTO postDTO = PostDTO.builder()
								.postId(entity.getPostId())
								.userNum(entity.getUser().getUserNum())
								.title(entity.getTitle())
								.content(entity.getContent())
								.category(entity.getCategory())
								.views(entity.getViews())
								.imagePath(entity.getImagePath())
								.visibility(entity.getVisibility())
								.createdAt(entity.getCreatedAt())
								.updatedAt(entity.getUpdatedAt())
								.status(entity.getStatus())
								.build();
			postDtos.add(postDTO);
		}		
		
		return postDtos;
	}
}
