package com.sulomon.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInterestDTO {

    private Integer userNum;     // 사용자 번호
    private Integer interestId;  // 관심사 ID
}