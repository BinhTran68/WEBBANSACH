package com.vn.webbansach_backend.service.impl;

import com.vn.webbansach_backend.constant.StatusCart;
import com.vn.webbansach_backend.entity.GioHang;
import com.vn.webbansach_backend.entity.NguoiDung;
import com.vn.webbansach_backend.entity.Sach;
import com.vn.webbansach_backend.exception.SachNotFoundException;
import com.vn.webbansach_backend.repository.GioHangRepository;
import com.vn.webbansach_backend.repository.NguoiDungRepository;
import com.vn.webbansach_backend.repository.SachRepository;
import com.vn.webbansach_backend.response.GioHangRespone;
import com.vn.webbansach_backend.response.Message;
import com.vn.webbansach_backend.response.SachResponse;
import com.vn.webbansach_backend.security.JwtService;
import com.vn.webbansach_backend.service.GioHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.List;

@Service
public class GioHangServiceImpl implements GioHangService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;


    @Autowired
    private GioHangRepository gioHangRepository;

    @Autowired
    private SachRepository sachRepository;


    @Override
    public ResponseEntity<?> getAllProductByCart(String token) {

        String userName = jwtService.extractUserName(token);
        // Check userName

        System.out.println("Tên người lấy giỏ hàng " + userName);

        NguoiDung nguoiDung = nguoiDungRepository.findNguoiDungByTenDangNhap(userName);
        if (nguoiDung == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Message("Người dùng không tồn tại"));
        }


        List<GioHangRespone> sachResponseList = gioHangRepository.getAllBookCartByMaNguoiDung(nguoiDung.getMaNguoiDung());

        if (sachResponseList == null || sachResponseList.size() == 0) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(sachResponseList);
    }

    @Override
    @Transactional
    public ResponseEntity<?> addProductToCartUser(String token, Integer maSach, Integer soLuong) {

        String userName = jwtService.extractUserName(token);

        NguoiDung nguoiDung = nguoiDungRepository.findNguoiDungByTenDangNhap(userName);
        if (nguoiDung == null) {
            throw new ResourceNotFoundException("Người dùng không tồn tại");
        }

        Sach sach = sachRepository.findById(maSach).orElseThrow(() -> new SachNotFoundException("Sách không còn tồn tại"));

        GioHang gioHangExits = gioHangRepository.findGioHangByNguoiDungAndSach(nguoiDung, sach);

        if (gioHangExits != null) {
            gioHangExits.setSoLuong(gioHangExits.getSoLuong()+soLuong);

            Double tongTien = (gioHangExits.getSoLuong()+soLuong) * sach.getGiaBan();

            gioHangExits.setTongTien(tongTien);

            gioHangRepository.save(gioHangExits);
            return ResponseEntity.ok().build();
        }else {
            GioHang gioHang = GioHang.builder()
                    .sach(sach)
                    .nguoiDung(nguoiDung)
                    .soLuong(soLuong)
                    .statusCart(StatusCart.CON_HANG)
                    .tongTien((sach.getGiaBan() * soLuong))
                    .build();

            gioHangRepository.save(gioHang);
            return ResponseEntity.ok().build();
        }
    }

    @Override
    public ResponseEntity<?> changeQuantityProduct(String token, Integer maSach, Integer newQuantity) {
        String userName = jwtService.extractUserName(token);
        NguoiDung nguoiDung = nguoiDungRepository.findNguoiDungByTenDangNhap(userName);
        if (nguoiDung == null) {
            throw new ResourceNotFoundException("Người dùng không tồn tại");
        }
        Sach sach = sachRepository.findById(maSach).orElseThrow(
                () -> new SachNotFoundException("Sách không còn tồn tại"));
        GioHang gioHang = gioHangRepository.findGioHangByNguoiDungAndSach(nguoiDung, sach);
        if (gioHang == null) {
            return ResponseEntity.notFound().build();
        }
        gioHang.setSoLuong(newQuantity);
        gioHangRepository.save(gioHang);
        return ResponseEntity.ok().build();
    }
}
