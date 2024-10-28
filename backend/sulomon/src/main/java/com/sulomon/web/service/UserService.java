package com.sulomon.web.service;

import com.sulomon.web.dto.UserDTO;

public interface UserService {
    boolean idCheck(String searchId);

    void join(UserDTO userDTO);

    void updateUser(UserDTO updatedUser);

    void deleteUser(String username);

    boolean passwordCheck(String username, String password);

    String generateVerificationCode();

    boolean verifyEmailCode(String email, String inputCode);

    void storeVerificationCode(String email, String verificationCode);

	UserDTO getCurrentUser(String username);

}