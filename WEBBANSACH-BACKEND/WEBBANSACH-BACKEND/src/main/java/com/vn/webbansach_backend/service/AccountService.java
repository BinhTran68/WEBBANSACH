package com.vn.webbansach_backend.service;

import com.vn.webbansach_backend.entity.NguoiDung;
import com.vn.webbansach_backend.request.NguoiDungRequest;
import org.springframework.http.ResponseEntity;

public interface AccountService {


    public ResponseEntity<?> registerUser(NguoiDungRequest nguoiDungRequest);

    public boolean existByTenDangNhap(String tenDangNhap);

    public ResponseEntity<?> kichHoatTaiKhoan(String email, String maKichHoat);

}
