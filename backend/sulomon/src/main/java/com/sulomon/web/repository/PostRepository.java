package com.sulomon.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sulomon.web.entity.PostsEntity;

@Repository
public interface PostRepository extends JpaRepository<PostsEntity, Integer> {

}
