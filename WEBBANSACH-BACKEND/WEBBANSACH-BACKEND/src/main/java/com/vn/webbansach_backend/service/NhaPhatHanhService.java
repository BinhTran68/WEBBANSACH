package com.vn.webbansach_backend.service;

import org.springframework.http.ResponseEntity;

public interface NhaPhatHanhService {
    ResponseEntity<?> getNhaPhatHanhByMaSach(Integer maSach);
}
