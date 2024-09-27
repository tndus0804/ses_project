package com.sulomon.web.service;

import org.springframework.stereotype.Service;

import com.sulomon.web.dto.PostDTO;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class PostServiceImpl implements PostService {
	
	@Override
	public void writePost(PostDTO postDTO) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updatePost() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deletePost() {
		// TODO Auto-generated method stub
		
	}

}
