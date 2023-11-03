package com.vn.webbansach_backend.service.impl;

import com.vn.webbansach_backend.entity.NguoiDung;
import com.vn.webbansach_backend.repository.NguoiDungRepository;
import com.vn.webbansach_backend.response.ErrorResponse;
import com.vn.webbansach_backend.response.Message;
import com.vn.webbansach_backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;



    @Override
    public ResponseEntity<?> registerUser(NguoiDung nguoiDung) {
        if (nguoiDungRepository.existsByTenDangNhap(nguoiDung.getTenDangNhap())) {

            System.out.println("Chạy vào hàm này");
            ErrorResponse errorResponse = new ErrorResponse("Tên đăng nhập đã tồn tại" );
            return ResponseEntity.status(400).body(errorResponse);
        }
        if (nguoiDungRepository.existsByEmail(nguoiDung.getEmail())) {
            return ResponseEntity.badRequest().body(new Message("Email đã tồn tại"));
        }

        NguoiDung nguoiDungDaDangky = nguoiDungRepository.save(nguoiDung);

        return  ResponseEntity.ok("Đăng kí thành công");

    }

    @Override
    public boolean existByTenDangNhap(String tenDangNhap) {
        return nguoiDungRepository.existsByTenDangNhap(tenDangNhap);
    }
}
