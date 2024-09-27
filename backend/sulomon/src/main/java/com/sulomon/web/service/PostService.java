package com.sulomon.web.service;

import com.sulomon.web.dto.PostDTO;

public interface PostService {
    void writePost(PostDTO postDTO);
    void updatePost();
    void deletePost();
}
