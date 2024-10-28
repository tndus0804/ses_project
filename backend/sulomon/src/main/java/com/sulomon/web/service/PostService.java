package com.sulomon.web.service;

import java.util.List;

import com.sulomon.web.dto.PostDTO;

public interface PostService {
	// 게시글 작성, 수정, 삭제
		void writePost(PostDTO postDTO, String username);
		boolean updatePost(PostDTO postDTO, String username);
		void deletePost(PostDTO postDTO, String username);

		// 게시글 조회
		PostDTO getPost(int postNum);
		// 게시글 전체 조회
		List<PostDTO> selectAll();

		// 게시글 검색
		List<PostDTO> searchPost(String keyword);
}
