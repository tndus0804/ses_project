package com.sulomon.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostInterestDTO {

    private Integer postId;         // 게시글 ID
    private Integer interestId;     // 관심사 ID
}