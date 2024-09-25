package com.sulomon.web.repository;

import com.sulomon.web.entity.GifticonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GifticonRepository extends JpaRepository<GifticonEntity, Integer> {
    // JpaRepository<Entity 클래스, ID 타입>을 상속받아 기본적인 CRUD 메서드를 제공
}