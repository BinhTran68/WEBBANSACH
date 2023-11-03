package com.vn.webbansach_backend.service;

import com.vn.webbansach_backend.entity.NguoiDung;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    public NguoiDung findByUserName(String tenDangNhap);
}
