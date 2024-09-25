package com.sulomon.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterestDTO {

    private Integer interestId;      // 관심사 ID
    private String interestName;     // 관심사 이름
    private Set<PostDTO> posts;      // 연관된 게시물 목록 (PostDTO로 변환)
}