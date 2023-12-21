package com.vn.webbansach_backend.service;

import org.springframework.http.ResponseEntity;

public interface GioHangService {
    ResponseEntity<?> getAllProductByCart(String token);

    ResponseEntity<?> addProductToCartUser(String token, Integer maSach, Integer soLuong);
}
