package com.sulomon.web.service;

import com.sulomon.web.dto.UserDTO;
import com.sulomon.auth.entity.UserEntity;
import com.sulomon.web.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository ur;
    // 암호화
    private final PasswordEncoder passwordEncoder;

    // 임시 저장
    private final Map<String, String> verificationCodes = new HashMap<>();

    @Override
    public boolean idCheck(String searchId) {
        return !ur.existsByUserId(searchId);
    }

    @Override
    public void join(UserDTO userDTO) {
        // UserDTO -> UserEntity 변환

        // 인증 성공 후 인증 코드 삭제 (중복 사용 방지)
        verificationCodes.remove(userDTO.getEmail());

        UserEntity userEntity = convertDtoToEntity(userDTO);
        log.info("UserEntity 정보: {}", userEntity);

        // 데이터베이스에 저장
        ur.save(userEntity);
        log.info("회원가입 성공 아이디: {}", userDTO.getUserId());
    }
    
    
    @Override
    public void updateUser(UserDTO updatedUser) {
        verificationCodes.remove(updatedUser.getEmail());
        UserEntity existingUser = ur.findByUserId(updatedUser.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updatedUser.getPassword() != null) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword())); // 비밀번호 암호화
        }
        existingUser.setEmail(updatedUser.getEmail());
//        existingUser.setInterests(updatedUser.getInterests());       
        
        ur.save(existingUser);
    }

    @Override
    public void deleteUser(String username) {
        UserEntity existingUser = ur.findByUserId(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        ur.delete(existingUser);
    }

    
    @Override
    public UserDTO getCurrentUser(String username) {
    	UserEntity userEntity = ur.findByUserId(username).orElse(null);
    	
    	// lombok의 builder 방식을 이용한 UserDTO 객체 생성
    	UserDTO userDTO = UserDTO.builder()
    			.userId(username)
    			.email(userEntity.getEmail())
    			.name(userEntity.getName())
    			.birthday(userEntity.getBirthday())
    			.gender(userEntity.getGender())
    			.phoneNumber(userEntity.getPhoneNumber())
				.build();
        return userDTO;
    }

    @Override
    public boolean passwordCheck(String username, String password) {
        UserEntity user = ur.findByUserId(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        String userPassword = user.getPassword();
        log.info("userPassword : ", userPassword);
        return passwordEncoder.matches(password, userPassword);

    }

    // 이메일 인증 코드 생성
    public String generateVerificationCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999)); // 6자리 숫자 생성
    }

    // 인증 코드 검증
    @Override
    public boolean verifyEmailCode(String email, String inputCode) {
        String storedCode = verificationCodes.get(email);
        if (storedCode != null && storedCode.equals(inputCode)) {
            return true;
        }
        return false;
    }

    // 이메일 인증 코드 저장
    public void storeVerificationCode(String email, String code) {
        verificationCodes.put(email, code);
    }

    // UserDTO -> UserEntity 변환 메서드
    private UserEntity convertDtoToEntity(UserDTO userDTO) {
        return UserEntity.builder()
                .userNum(userDTO.getUserNum())
                .userId(userDTO.getUserId())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .email(userDTO.getEmail())
                .name(userDTO.getName())
                .birthday(userDTO.getBirthday())
                .gender(userDTO.getGender())
                .socialLogin(userDTO.isSocialLogin())
                .role(userDTO.getRole())
                .phoneNumber(userDTO.getPhoneNumber())
                .points(userDTO.getPoints())
                .createdAt(userDTO.getCreatedAt())
                .updatedAt(LocalDateTime.now())  // 계정 수정 시간은 현재 시각으로 설정
                .status(userDTO.getStatus())
                .isEmailVerified(true)
                .build();
    }
}