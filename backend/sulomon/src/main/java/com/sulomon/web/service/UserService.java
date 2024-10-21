package com.sulomon.web.service;

import com.sulomon.web.dto.UserDTO;

public interface UserService {

    boolean idCheck(String searchId);

    void join(UserDTO userDTO);

    boolean passwordCheck(String username, String password);


    String generateVerificationCode();

    boolean verifyEmailCode(String email, String inputCode);

    void storeVerificationCode(String email, String verificationCode);
}
