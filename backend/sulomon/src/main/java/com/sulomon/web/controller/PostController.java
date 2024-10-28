package com.sulomon.web.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sulomon.web.dto.PostDTO;
import com.sulomon.web.security.JwtUtil;
import com.sulomon.web.service.PostService;

// 게시글 작성, 수정, 조회, 삭제 작업 처리
// 게시글의 상태 변경 및 카테고리 관련 작업
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/post")
public class PostController {
	private final PostService postService;
	private final JwtUtil jwtUtil;
	ObjectMapper objectMapper = new ObjectMapper();

	/**
	 * 게시글 작성
	 */
	@PostMapping("write")
	public ResponseEntity<Map<String, String>> writePost(
				@RequestBody Map<String, Object> requestData
			) {
		Map<String, String> response = new HashMap<>();
		
		PostDTO postDTO = objectMapper.convertValue(requestData.get("postDTO"), PostDTO.class);
		// token
		String token = (String) requestData.get("token");
		String username = jwtUtil.extractUsername(token);
		
		// log.debug("\n넘어온 데이터: {}\n유저이름: {}", postDTO, username);
		postService.writePost(postDTO, username);
		
		response.put("message", "post 등록이 성공적으로 제출되었습니다.");
		return ResponseEntity.ok(response);
	}

	/**
	 * 게시글 수정
	 */
	@GetMapping("update")
	public ResponseEntity<Map<String, String>> updatePost(
				@RequestBody Map<String, Object> requestData
			) {
		Map<String, String> response = new HashMap<>();
		
		PostDTO postDTO = objectMapper.convertValue(requestData.get("postDTO"), PostDTO.class);
		
		// token
		String token = (String) requestData.get("token");
		String username = jwtUtil.extractUsername(token);
		
		boolean result = postService.updatePost(postDTO, username);

		if (result) {
			log.debug("업데이트 성공");
			response.put("message", "게시글 수정이 완료되었습니다.");
		} else {
			log.debug("업데이트 실패");
			response.put("message", "게시글 수정이 실패하였습니다.");
		}
		
		
		return ResponseEntity.ok(response);
	}

	/**
	 * 게시글 삭제
	 */
	@GetMapping("delete")
	public ResponseEntity<Map<String, String>> deletePost(
				@RequestBody Map<String, Object> requestData
			) {
		Map<String, String> response = new HashMap<>();
		
		PostDTO postDTO = objectMapper.convertValue(requestData.get("postDTO"), PostDTO.class);
		
		// token
		String token = (String) requestData.get("token");
		String username = jwtUtil.extractUsername(token);
		
		postService.deletePost(postDTO, username);

		response.put("message", "게시물 삭제가 완료되었습니다.");
		
		return ResponseEntity.ok(response);
	}
	
	/**
	 * 게시글 조회 (1개)
	 */
	@GetMapping("getPost/{postId}")
	public ResponseEntity<Map<String, Object>> getPost(
				@PathVariable("postId") int postId
			) {
		Map<String, Object> response = new HashMap<>();
		
		PostDTO post = postService.getPost(postId);
		
		log.debug("asdfasdfasdf: {}", post);

		
		response.put("posts", post);
		return ResponseEntity.ok(response);
	}
	
	/**
	 * 게시글 전체 조회
	 */
	@GetMapping("selectAll")
	public ResponseEntity<Map<String, Object>> sectPostAll() {
		Map<String, Object> response = new HashMap<>();
		
		List<PostDTO> postList = postService.selectAll();
		response.put("posts", postList);
		
//		try {
//			String jsonPostList = objectMapper.writeValueAsString(postList);
//			response.put("posts", jsonPostList);
//		} catch (JsonProcessingException e) {
//			e.printStackTrace(); // 예외 처리
//		}
		return ResponseEntity.ok(response);
	}

	/**
	 * 게시글 검색 & 관심사 검색
	 */
	/**
	 * 게시글 검색
	 */
	@GetMapping("searchPost")
	public List<PostDTO> searchPost(
			@RequestParam("keyword") String keyword
		) {
		// 게시글 검색 => PostsEntity
		List<PostDTO> posts= postService.searchPost(keyword);
		return posts;
	}
}
