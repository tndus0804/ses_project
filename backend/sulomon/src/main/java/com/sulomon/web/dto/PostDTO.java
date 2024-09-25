package com.sulomon.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {

    private int postId;                // 게시물 ID
    private int userNum;               // 작성자 ID
    private String title;              // 게시물 제목
    private String content;            // 게시물 내용
    private String category;           // 카테고리
    private int views;                 // 조회수
    private String imagePath;          // 이미지 파일 경로
    private Visibility visibility;     // 공개/비공개 상태
    private LocalDateTime createdAt;   // 생성 시간
    private LocalDateTime updatedAt;   // 수정 시간
    private Status status;             // 게시물 상태
    private Set<InterestDTO> interests; // 관심사 목록

    // ENUM 타입들 정의
    public enum Visibility {
        VISIBLE, HIDDEN
    }

    public enum Status {
        ACTIVE, DELETED
    }
}