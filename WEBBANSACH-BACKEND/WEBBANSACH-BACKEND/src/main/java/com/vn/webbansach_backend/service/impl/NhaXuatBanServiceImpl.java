package com.vn.webbansach_backend.service.impl;

import com.vn.webbansach_backend.entity.NhaXuatBan;
import com.vn.webbansach_backend.repository.NhaXuatBanRepository;
import com.vn.webbansach_backend.service.NhaXuatBanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NhaXuatBanServiceImpl implements NhaXuatBanService {

    @Autowired
    private NhaXuatBanRepository  nhaXuatBanRepository;

    @Override
    public ResponseEntity<?> getAllNhaXuatBanByMaSach(Integer maSach) {
        NhaXuatBan nhaXuatBan;
        nhaXuatBan = nhaXuatBanRepository.findNhaXuatBanByMaSach(maSach);
        if (nhaXuatBan == null) {
            return ResponseEntity.status(204).body(null);
        }
        return ResponseEntity.status(200).body(nhaXuatBan);
    }
}
