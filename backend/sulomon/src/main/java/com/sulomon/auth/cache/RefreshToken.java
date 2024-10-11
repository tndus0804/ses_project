package com.sulomon.auth.cache;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

@Builder
@Getter
@RedisHash("refresh-token") // K-V DB: Prefix of Key
public class RefreshToken {
    @Id
    private String refreshToken; // "refresh-token:abc123"
    @Indexed // findByUserId
    private String userId; // K"userId"-V"refresh-token:abc123"
    // userAgent, 마지막 접속 IP, 마지막 접속 국가, ...
    @TimeToLive // 캐싱 되는 것들은 -> 만료(maxAge, TTL)
    private Integer timeToLive; // 2,592,000
}
