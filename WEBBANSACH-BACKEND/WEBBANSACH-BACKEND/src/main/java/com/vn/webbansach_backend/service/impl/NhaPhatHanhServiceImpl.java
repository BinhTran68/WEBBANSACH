package com.vn.webbansach_backend.service.impl;

import com.vn.webbansach_backend.entity.NhaPhatHanh;
import com.vn.webbansach_backend.repository.NhaPhatHanhRepository;
import com.vn.webbansach_backend.response.NhaPhatHanhResponse;
import com.vn.webbansach_backend.service.NhaPhatHanhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class NhaPhatHanhServiceImpl implements NhaPhatHanhService {

    @Autowired
    private NhaPhatHanhRepository nhaPhatHanhRepository;

    @Override
    public ResponseEntity<?> getNhaPhatHanhByMaSach(Integer maSach) {
        NhaPhatHanhResponse nhaPhatHanh = nhaPhatHanhRepository.getNhaPhatHanhByMaSach(maSach);
        if (nhaPhatHanh == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(nhaPhatHanh);
    }
}
