package com.sulomon.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {

    private Integer commentId;       // 댓글 ID
    private Integer postId;          // 게시글 ID
    private Integer userNum;         // 사용자 ID
    private String username;         // 작성자 이름
    private String content;          // 댓글 내용
    private LocalDateTime createdAt; // 댓글 생성 시간
    private CommentStatus status;    // 댓글 상태

    // 댓글 상태를 정의하는 ENUM (ACTIVE, DELETED)
    public enum CommentStatus {
        ACTIVE, DELETED
    }
}