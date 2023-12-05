package com.vn.webbansach_backend.controller;

import com.vn.webbansach_backend.entity.ChiTietDonHang;
import com.vn.webbansach_backend.repository.ChiTietDonHangRepository;
import com.vn.webbansach_backend.service.SachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/client")
public class ClientController {


    @Autowired
    private SachService sachService;

    @GetMapping("/get-info-sach")
    ResponseEntity<?> getInfoBookByMaSach(@RequestParam Integer maSach) {
        return sachService.findInfoSachById(maSach);
    }

}
