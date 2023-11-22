package com.vn.webbansach_backend.controller;

import com.vn.webbansach_backend.service.NhaXuatBanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/nha-xuat-ban")
public class NhaXuatBanController {

    @Autowired
    private NhaXuatBanService nhaXuatBanService;

    @GetMapping("/get-by-masach")
    ResponseEntity<?> getTheLoaiByMaSach (@Param("maSach") Integer maSach) {
        return  nhaXuatBanService.getAllNhaXuatBanByMaSach(maSach);
    }

}
