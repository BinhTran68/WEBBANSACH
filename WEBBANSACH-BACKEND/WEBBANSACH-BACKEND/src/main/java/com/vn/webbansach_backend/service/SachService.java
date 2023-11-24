package com.vn.webbansach_backend.service;

import com.vn.webbansach_backend.request.SachRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;


public interface SachService {
    ResponseEntity<?> saveBookByRequest(SachRequest sachRequest);

    ResponseEntity<?> getAllSachResponse(Pageable pageable);

    ResponseEntity<Object> delSachById(Integer id);
}
