package com.vn.webbansach_backend.service;

import com.vn.webbansach_backend.entity.NguoiDung;


public interface UserDetailsService extends org.springframework.security.core.userdetails.UserDetailsService {
    public NguoiDung findByUserName(String tenDangNhap);
}
