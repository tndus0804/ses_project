package com.sulomon.web.repository;

import com.sulomon.web.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * UserRepository - UserEntity와 데이터베이스 간의 상호작용을 처리
 * JpaRepository를 상속받아 기본적인 CRUD 기능 제공
 *
 * @Repository - Spring이 인터페이스를 레포지토리 빈으로 관리하도록 설정
 */
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    // JpaRepository<Entity 클래스, ID 타입>을 상속받아 기본적인 CRUD 메서드를 제공
}