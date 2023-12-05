package com.vn.webbansach_backend.service;

import com.vn.webbansach_backend.request.HinhAnhRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface HinhAnhService {

    ResponseEntity<?> deleById(Integer maHinhAnh) throws IOException;

    ResponseEntity<?> updateImageBookAccordingtoIdAndSaveFile(Integer maSach, MultipartFile[] files, Integer[] ids) throws IOException;
}
