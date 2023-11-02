package com.vn.webbansach_backend.controller;

import com.vn.webbansach_backend.entity.ChiTietDonHang;
import com.vn.webbansach_backend.repository.ChiTietDonHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {



    @Autowired
    ChiTietDonHangRepository chiTietDonHangRepository;

    @GetMapping("/")
    public void test() {
        System.out.println("abc");

    }
}
