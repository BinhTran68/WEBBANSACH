package com.vn.webbansach_backend.controller;

import com.vn.webbansach_backend.entity.NguoiDung;
import com.vn.webbansach_backend.request.NguoiDungRequest;
import com.vn.webbansach_backend.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AccountService accountService;


    @GetMapping("/check-username")
    public boolean exitsUserbyUserName(@RequestParam("username") String tenDangNhap) {
        return accountService.existByTenDangNhap(tenDangNhap);
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody NguoiDungRequest nguoiDungRequest) {
        return accountService.registerUser(nguoiDungRequest);
    }


    @GetMapping("/activated")
    public ResponseEntity<?> activatedAccount(@RequestParam String email,
                                              @RequestParam String activationCode ) {
        System.out.println("có gọi hàm");
        return accountService.kichHoatTaiKhoan(email, activationCode);
    }





}
