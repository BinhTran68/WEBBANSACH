package com.vn.webbansach_backend.service.impl;

import com.vn.webbansach_backend.entity.NguoiDung;
import com.vn.webbansach_backend.repository.NguoiDungRepository;
import com.vn.webbansach_backend.request.NguoiDungRequest;
import com.vn.webbansach_backend.response.ErrorResponse;
import com.vn.webbansach_backend.response.Message;
import com.vn.webbansach_backend.service.AccountService;
import com.vn.webbansach_backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;


    @Override
    @Transactional
    public ResponseEntity<?> registerUser(NguoiDungRequest nguoiDungRequest) {
        if (nguoiDungRepository.existsByTenDangNhap(nguoiDungRequest.getTenDangNhap())) {
            ErrorResponse errorResponse = new ErrorResponse("Tên đăng nhập đã tồn tại");
            return ResponseEntity.badRequest().body(errorResponse);
        }
        if (nguoiDungRepository.existsByEmail(nguoiDungRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new Message("Email đã tồn tại"));
        }

        NguoiDung nguoiDung = new NguoiDung();

        nguoiDung.setTenDangNhap(nguoiDungRequest.getTenDangNhap());
        nguoiDung.setMatKhau(passwordEncoder.encode(nguoiDungRequest.getMatKhau()));
        nguoiDung.setHoDem(nguoiDungRequest.getHoDem());
        nguoiDung.setTen(nguoiDungRequest.getTen());
        nguoiDung.setSoDienThoai(nguoiDungRequest.getSoDienThoai());
        nguoiDung.setEmail(nguoiDungRequest.getEmail());


        // Gán và gửi thông tin kích hoạt
        // Tạo 1 mã kích hoạt cho người dùng
        nguoiDung.setMaKichHoat(taoMaKichHoat());
        nguoiDung.setDaKichHoat(false);


        NguoiDung nguoiDungDaDangky = nguoiDungRepository.save(nguoiDung);

        guiEmailKichHoat(nguoiDung.getEmail(), nguoiDung.getMaKichHoat());


        return ResponseEntity.ok("Đăng kí thành công");

    }


    private String taoMaKichHoat() {
        return UUID.randomUUID().toString(); // tạo ra mã logic ngẫu nhiên
    }

    @Override
    public ResponseEntity<?> kichHoatTaiKhoan(String email, String maKichHoat) {

        NguoiDung nguoiDung = nguoiDungRepository.findNguoiDungByEmail(email);

        if (nguoiDung == null) {
            return ResponseEntity.badRequest().body(new Message("Người dùng không tồn tại"));
        }

        if (nguoiDung.isDaKichHoat()) {
            return ResponseEntity.badRequest().body(new Message("Người dùng đã được kích hoạt"));
        }

        if (maKichHoat.equals(nguoiDung.getMaKichHoat())) {
            nguoiDung.setDaKichHoat(true);
            nguoiDungRepository.save(nguoiDung);
            return ResponseEntity.ok(new Message("Kích hoạt tài khoản thành công"));
        }

        return ResponseEntity.badRequest().body(new Message("Mã kích hoạt không chính xác"));

    }


    private void guiEmailKichHoat(String email, String maKichHoat) {
        String subject = "Kích hoạt tài khoản của bạn tại WebBanSach";
        String text = "Vui lòng sử dụng mã sau để kich hoạt cho tài khoản <" + email + ">:<html><body><br/><h1>" + maKichHoat + "</h1></body></html>";
        text += "<br/> Click vào đường link để kích hoạt tài khoản: ";
        String url = "http://localhost:3000/kich-hoat/" + email + "/" + maKichHoat;
        text += ("<br/> <a href=" + url + ">" + url + "</a> ");

        emailService.sendMessage("binhtd2268@gmail.com", email, subject, text);
    }


    @Override
    public boolean existByTenDangNhap(String tenDangNhap) {
        return nguoiDungRepository.existsByTenDangNhap(tenDangNhap);
    }
}
