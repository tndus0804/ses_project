package com.sulomon.pay.controller;

import com.sulomon.pay.entity.PaymentEntity;
import com.sulomon.web.repository.PaymentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentRepository paymentRepository;

    // PaymentRepository 주입
    public PaymentController(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    // 특정 사용자의 결제 내역을 userId로 가져오는 API
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaymentEntity>> getPaymentsByUserId(@PathVariable("userId") String userId) {
        // userId에 해당하는 결제 내역을 조회
        List<PaymentEntity> payments = paymentRepository.findByUser_UserId(userId);

        // 조회된 결제 내역을 응답으로 반환
        return ResponseEntity.ok(payments);
    }
}