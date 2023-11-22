package com.vn.webbansach_backend.service;

import com.vn.webbansach_backend.entity.TheLoai;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TheLoaiService {

    ResponseEntity<?> getAllTheLoaiByMaSachi(Integer maSach);
}
