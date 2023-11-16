package com.vn.webbansach_backend.service;

import com.vn.webbansach_backend.request.SachRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


public interface SachService {
    ResponseEntity<?> saveBookByRequest(SachRequest sachRequest);
}
