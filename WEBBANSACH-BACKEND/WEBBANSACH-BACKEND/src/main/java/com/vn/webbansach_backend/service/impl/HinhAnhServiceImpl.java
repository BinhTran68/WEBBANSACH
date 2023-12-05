package com.vn.webbansach_backend.service.impl;

import com.vn.webbansach_backend.config.FileUpload;
import com.vn.webbansach_backend.entity.HinhAnh;
import com.vn.webbansach_backend.entity.Sach;
import com.vn.webbansach_backend.exception.ResourceNotFoundException;
import com.vn.webbansach_backend.exception.SachNotFoundException;
import com.vn.webbansach_backend.repository.HinhAnhRepository;
import com.vn.webbansach_backend.repository.SachRepository;
import com.vn.webbansach_backend.request.HinhAnhRequest;
import com.vn.webbansach_backend.response.Message;
import com.vn.webbansach_backend.service.HinhAnhService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HinhAnhServiceImpl implements HinhAnhService {

    @Autowired
    private HinhAnhRepository hinhAnhRepository;

    @Autowired
    private SachRepository sachRepository;

    @Autowired
    private FileUpload fileUpload;


    @Override
    public ResponseEntity<?> deleById(Integer maHinhAnh) throws IOException {
        if (!hinhAnhRepository.existsById(maHinhAnh)) {
            return ResponseEntity.notFound().build();
        }
        HinhAnh hinhAnh = hinhAnhRepository.findById(maHinhAnh).orElseThrow(() -> new ResourceNotFoundException("Hình ảnh k tồn tại"));
        if (hinhAnh.isIcon()) {
            return ResponseEntity.status(409).body("Không thể xóa hình ảnh này");
        }
        hinhAnhRepository.delete(hinhAnh);

        Thread thread = new Thread(new Runnable() {
            @SneakyThrows
            @Override
            public void run() {
                fileUpload.deleteImageAtCloudinary(hinhAnh.getLink());
            }
        });
        // Khởi động thread
        thread.start();

        return ResponseEntity.noContent().build();
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateImageBookAccordingtoIdAndSaveFile(Integer maSach, MultipartFile[] files, Integer[] ids) throws IOException {
        Sach sach = sachRepository.findById(maSach).orElse(null);
        if (sach == null) {
            return ResponseEntity.status(404).body(new Message("Sách không tồn tại"));
        }

        if (files.length != ids.length) {
            return ResponseEntity.status(400).body(new Message("Số lượng file và id không khớp"));
        }
        int i = 0;
        for (Integer id : ids) {
            if (id == 0) {
                HinhAnh hinhAnh = new HinhAnh();
                String url = fileUpload.uploadFile(files[i]);
                hinhAnh.setTenHinhAnh("Hình ảnh sách");
                hinhAnh.setLink(url);
                hinhAnh.setMaHinhAnh(0);
                hinhAnh.setSach(sach);

                hinhAnhRepository.save(hinhAnh);
            }
            i++;


        }

        return ResponseEntity.ok("Update Image sucsses");
    }
}
