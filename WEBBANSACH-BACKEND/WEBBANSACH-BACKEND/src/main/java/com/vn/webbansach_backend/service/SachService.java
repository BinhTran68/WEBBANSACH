package com.vn.webbansach_backend.service;

import com.vn.webbansach_backend.request.SachRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


public interface SachService {
    ResponseEntity<?> saveBookByRequest(SachRequest sachRequest, MultipartFile multipartFile) throws IOException;

    ResponseEntity<?> getAllSachResponse(Pageable pageable);

    ResponseEntity<Object> delSachById(Integer id);

    ResponseEntity<?> findInfoSachById(Integer maSach);
}
