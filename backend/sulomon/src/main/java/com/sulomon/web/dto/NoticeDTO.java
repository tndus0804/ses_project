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
public class NoticeDTO {

    private Integer noticeId;           // 공지사항 ID
    private Integer adminNum;           // 관리자 ID
    private String title;               // 공지사항 제목
    private String content;             // 공지사항 내용
    private LocalDateTime createdAt;    // 공지 생성 시간
    private LocalDateTime updatedAt;    // 공지 수정 시간
}