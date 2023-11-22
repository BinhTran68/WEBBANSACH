package com.vn.webbansach_backend.service;

import org.springframework.http.ResponseEntity;

public interface NhaXuatBanService {
    ResponseEntity<?> getAllNhaXuatBanByMaSach(Integer maSach);
}
