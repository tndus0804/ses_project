package com.sulomon.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.sulomon")
public class SulomonApplication {

	public static void main(String[] args) {
		SpringApplication.run(SulomonApplication.class, args);
	}

}
