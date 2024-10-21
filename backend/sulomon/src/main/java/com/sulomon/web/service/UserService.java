package com.sulomon.web.service;

import com.sulomon.web.dto.UserDTO;

public interface UserService {

    boolean idCheck(String searchId);

    void join(UserDTO userDTO);
    
    void updateUser(UserDTO updatedUser);
    
    void deleteUser(String username);

    boolean passwordCheck(String username, String password);
    
    UserDTO getCurrentUser(String username);
}