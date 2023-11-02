package com.vn.webbansach_backend.service;

import com.vn.webbansach_backend.entity.NguoiDung;
import org.springframework.http.ResponseEntity;

public interface AccountService {


    public ResponseEntity<?> registerUser(NguoiDung nguoiDung);

    public boolean existByTenDangNhap(String tenDangNhap);

}
