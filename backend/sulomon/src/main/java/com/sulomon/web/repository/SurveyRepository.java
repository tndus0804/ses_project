package com.sulomon.web.repository;

import com.sulomon.web.entity.SurveyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveyRepository extends JpaRepository<SurveyEntity, Integer> {
    // 유저의 userId를 기준으로 설문조사를 찾는 쿼리 메소드
    List<SurveyEntity> findByUser_UserId(String userId);
}