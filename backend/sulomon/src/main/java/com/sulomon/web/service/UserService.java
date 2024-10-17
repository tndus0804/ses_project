package com.sulomon.web.service;

import com.sulomon.web.dto.UserDTO;

public interface UserService {

    boolean idCheck(String searchId);

    void join(UserDTO userDTO);

    boolean passwordCheck(String username, String password);
}
