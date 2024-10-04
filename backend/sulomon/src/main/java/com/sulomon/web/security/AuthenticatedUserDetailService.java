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
public class AuthenticatedUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userNum) throws UsernameNotFoundException {
        log.info("로그인 시도: userNum = {}", userNum);

        // userNum을 사용하여 사용자 조회
        UserEntity userEntity = userRepository.findById(Integer.parseInt(userNum))
                .orElseThrow(() -> new UsernameNotFoundException("유저를 찾을 수 없습니다. with userNum: " + userNum));

        log.debug("조회된 사용자 정보: {}", userEntity);

        // UserEntity를 AuthenticatedUser로 변환하여 반환
        AuthenticatedUser user = AuthenticatedUser.builder()
                .userId(userEntity.getUserId()) // 이 필드도 필요하다면 유지
                .password(userEntity.getPassword())
                .name(userEntity.getName())
                .isActive("active".equals(userEntity.getStatus()))  // 계정 상태를 문자열로 비교
                .build();

        log.debug("인증 정보 : {}", user);
        return user;
    }
}