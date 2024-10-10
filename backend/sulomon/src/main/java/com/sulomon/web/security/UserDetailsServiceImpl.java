package com.sulomon.web.security;

import com.sulomon.web.entity.UserEntity;
import com.sulomon.web.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        log.info("로그인 시도: userId = {}", userId);

        // userId를 사용하여 사용자 조회 (문자열 기반 조회)
        UserEntity userEntity = userRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("아이디를 찾을 수 없습니다: " + userId));

        log.debug("조회된 사용자 정보: {}", userEntity);

        // UserEntity를 AuthenticatedUser로 변환하여 반환
        AuthenticatedUser authenticatedUser = AuthenticatedUser.builder()
                .userId(userEntity.getUserId()) // userId
                .password(userEntity.getPassword()) // 암호화된 비밀번호
                .name(userEntity.getName()) // 사용자 이름
                .isActive("active".equals(userEntity.getStatus()))  // 계정 상태 확인
                .build();

        log.debug("인증된 사용자 정보: {}", authenticatedUser);
        return authenticatedUser;
    }
}