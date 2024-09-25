package com.sulomon.web.repository;

import com.sulomon.web.entity.UserInterestEntity;
import com.sulomon.web.entity.UserInterestId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInterestRepository extends JpaRepository<UserInterestEntity, UserInterestId> {
    // 추가적인 쿼리 메서드를 작성할 수 있습니다.
}