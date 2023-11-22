package com.vn.webbansach_backend.controller;

import com.vn.webbansach_backend.entity.TheLoai;
import com.vn.webbansach_backend.service.TheLoaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/the-loai")
public class TheLoaiController {

    @Autowired
    private TheLoaiService theLoaiService;

    @GetMapping("/get-theloai-by-id-sach")
    public ResponseEntity<?> getTheLoaiByMaSach(@RequestParam Integer maSach) {
        return theLoaiService.getAllTheLoaiByMaSachi(maSach);
    }

}
