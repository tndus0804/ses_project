package com.sulomon.auth.dto;

import lombok.Builder;

@Builder
public record AuthToken(
        String accessToken,
        String refreshTokenBase64
) {
    public AuthToken {
        assert accessToken != null : "";
        assert refreshTokenBase64 != null : "";
        assert !accessToken.isBlank() : "";
        assert !refreshTokenBase64.isBlank() : "";
        // 추후 생각
        // 테스트 코드 돌릴 때(-ea 옵션이 있을 때) 실행되는 것: assert
        // 사소한 건 이렇게 assert 써도 되지만 지양하고
        // 테스트코드를 작성하는 게 더 바람직.
    }
}
