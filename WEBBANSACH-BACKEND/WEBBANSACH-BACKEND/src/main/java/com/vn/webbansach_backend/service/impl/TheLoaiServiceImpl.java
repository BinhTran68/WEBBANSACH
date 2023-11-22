package com.vn.webbansach_backend.service.impl;

import com.vn.webbansach_backend.entity.TheLoai;
import com.vn.webbansach_backend.repository.TheLoaiRepository;
import com.vn.webbansach_backend.response.TheLoaiResponse;
import com.vn.webbansach_backend.service.TheLoaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class TheLoaiServiceImpl implements TheLoaiService {

    @Autowired
    private TheLoaiRepository theLoaiRepository;


    @Override
    public ResponseEntity<?> getAllTheLoaiByMaSachi(Integer maSach) {
        List<TheLoaiResponse> theLoaiList ;
        System.out.println("gọi đến hàm này");
        theLoaiList = theLoaiRepository.getAllTheLoaiResponeseByMaSach(maSach);
        System.out.println(theLoaiList.size());
        System.out.println(theLoaiList);
        return ResponseEntity.ok(theLoaiList);
    }
}
