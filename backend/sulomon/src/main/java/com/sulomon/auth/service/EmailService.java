package com.sulomon.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendVerificationEmail(String toEmail, String verificationCode) {
        try {
            // MimeMessage 생성
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            // 수신자 설정
            helper.setTo(toEmail);

            // 제목 설정
            helper.setSubject("이메일 인증 코드");

            // 이메일 내용 (HTML 형식으로 작성)
            String content = "<h3>이메일 인증 코드</h3>" +
                    "<p>아래 인증 코드를 입력하여 이메일 인증을 완료하세요.</p>" +
                    "<p><strong>" + verificationCode + "</strong></p>";

            // 내용 설정 (HTML로 전송)
            helper.setText(content, true);

            // 이메일 전송
            mailSender.send(message);
            System.out.println("이메일 전송 성공");

        } catch (Exception e) {
            System.err.println("이메일 전송 실패: " + e.getMessage());
        }
    }
}