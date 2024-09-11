package com.sulomon.web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping({"", "/"})  // "/api" 또는 "/api/" 경로로 요청이 들어올 때 이 메서드가 실행됨
    public String home() {
        return "Home from Spring Boot!";
    }
}