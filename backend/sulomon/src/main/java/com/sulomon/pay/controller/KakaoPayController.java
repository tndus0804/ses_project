package com.sulomon.pay.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
public class KakaoPayController {

    @PostMapping("/api/pay/kakao")
    public ResponseEntity<?> kakaoPayRequest(@RequestBody Map<String, String> paymentData) {
        String requestUrl = "https://kapi.kakao.com/v1/payment/ready";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "test");
        headers.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        // 요청 파라미터 설정
        Map<String, String> params = new HashMap<>();
        params.put("cid", "TC0ONETIME");  // 테스트용 가맹점 코드
        params.put("partner_order_id", "1001");  // 주문 번호
        params.put("partner_user_id", "user123");  // 사용자 ID
        params.put("item_name", "테스트 상품");  // 상품 이름
        params.put("quantity", "1");
        params.put("total_amount", "1000");  // 결제 금액
        params.put("tax_free_amount", "0");
        params.put("approval_url", "http://localhost:3000/pay/success");  // 성공 시 리다이렉션 URI
        params.put("cancel_url", "http://localhost:3000/pay/cancel");  // 취소 시 리다이렉션 URI
        params.put("fail_url", "http://localhost:3000/pay/fail");  // 실패 시 리다이렉션 URI

        HttpEntity<Map<String, String>> request = new HttpEntity<>(params, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(requestUrl, HttpMethod.POST, request, String.class);

        return ResponseEntity.ok(response.getBody());
    }
}