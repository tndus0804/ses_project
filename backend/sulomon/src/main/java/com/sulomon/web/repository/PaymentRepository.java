package com.sulomon.web.repository;

import com.sulomon.pay.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Integer> {
    List<PaymentEntity> findByUser_UserId(String userId);
}