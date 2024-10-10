package com.sulomon.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {

    private int postId;                // 게시물 ID
    private UUID userNum;               // 작성자 ID
    private String title;              // 게시물 제목
    private String content;            // 게시물 내용
    private String category;           // 카테고리
    private int views;                 // 조회수
    private String imagePath;          // 이미지 파일 경로
    private String visibility;         // 공개/비공개 상태 (VISIBLE, HIDDEN)
    private String privatePassword;    // 게시글 비밀번호
    private LocalDateTime createdAt;   // 생성 시간
    private LocalDateTime updatedAt;   // 수정 시간
    private String status;             // 게시물 상태 (ACTIVE, DELETED)
}