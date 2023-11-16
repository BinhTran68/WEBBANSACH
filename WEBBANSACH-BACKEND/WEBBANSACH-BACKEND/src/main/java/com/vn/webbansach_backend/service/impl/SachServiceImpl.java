package com.vn.webbansach_backend.service.impl;

import com.vn.webbansach_backend.entity.HinhAnh;
import com.vn.webbansach_backend.entity.NhaPhatHanh;
import com.vn.webbansach_backend.entity.NhaXuatBan;
import com.vn.webbansach_backend.entity.Sach;
import com.vn.webbansach_backend.entity.TheLoai;
import com.vn.webbansach_backend.exception.NhaPhatHanhNotFoundException;
import com.vn.webbansach_backend.exception.TheLoaiNotFoundException;
import com.vn.webbansach_backend.repository.HinhAnhRepository;
import com.vn.webbansach_backend.repository.NhaPhatHanhRepository;
import com.vn.webbansach_backend.repository.NhaXuatBanRepository;
import com.vn.webbansach_backend.repository.SachRepository;
import com.vn.webbansach_backend.repository.TheLoaiRepository;
import com.vn.webbansach_backend.request.SachRequest;
import com.vn.webbansach_backend.response.Message;
import com.vn.webbansach_backend.service.SachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SachServiceImpl implements SachService {

    @Autowired
    private SachRepository sachRepository;

    @Autowired
    private TheLoaiRepository theLoaiRepository;

    @Autowired
    private HinhAnhRepository hinhAnhRepository;

    @Autowired
    private NhaPhatHanhRepository nhaPhatHanhRepository;

    @Autowired
    private NhaXuatBanRepository nhaXuatBanRepository;


    @Override
    public ResponseEntity<?> saveBookByRequest(SachRequest sachRequest) {

        Sach sach = new Sach();
        sach.setMaSach(sach.getMaSach());
        sach.setTenSach(sachRequest.getTenSach());
        sach.setTenTacGia(sach.getTenTacGia());
        sach.setISBN(sachRequest.getISBN());
        sach.setMoTa(sachRequest.getMoTa());
        sach.setHangChinhHang(sachRequest.getHangChinhHang());
        sach.setDichGia(sachRequest.getDichGia());
        sach.setLoaiBia(sachRequest.getLoaiBia());
        sach.setSoTrang(sachRequest.getSoTrang());
        sach.setGiaBan(sachRequest.getGiaBan());
        sach.setGiaNiemYet(sachRequest.getGiaNiemYet());
        sach.setDichGia(sachRequest.getDichGia());
        sach.setSoLuong(sachRequest.getSoLuong());
        sach.setTrungBinhXepHang(Double.parseDouble("0"));

        List<TheLoai> theLoaiList = new ArrayList<>();

        theLoaiList = theLoaiRepository.findAllById(sachRequest.getMaTheLoai());
//        sachRequest.getMaTheLoai().forEach((maTheLoai) -> {
//
//
//
//            TheLoai theLoai = theLoaiRepository.findById(maTheLoai)
//                    .orElseThrow(() -> new TheLoaiNotFoundException("Không tìm thấy thể loại mà bạn yêu cầu"));
//            theLoaiList.add(theLoai);
//        });


        sach.setDanhSachTheLoai(theLoaiList);

//        sach.getDanhSachTheLoai().add(theLoai);

        NhaPhatHanh nhaPhatHanh = nhaPhatHanhRepository.findById(sachRequest.getNhaPhatHanh())
                .orElseThrow(() -> new NhaPhatHanhNotFoundException("Nhà phát hành không tồn tại"));

        List<NhaPhatHanh> nhaPhatHanhs = new ArrayList<>();
        nhaPhatHanhs.add(nhaPhatHanh);
        sach.setDanhSachNhaPhatHanh(nhaPhatHanhs);



        NhaXuatBan nhaXuatBan = nhaXuatBanRepository.findById(sachRequest.getNhaXuatBan())
                .orElseThrow(() -> new NhaPhatHanhNotFoundException("Nhà xuất bản không tồn tại"));

        sach.setNhaXuatBanSach(nhaXuatBan);

        Sach sachNew = sachRepository.save(sach);

        HinhAnh hinhAnh = new HinhAnh();
        hinhAnh.setMaHinhAnh(0);
        hinhAnh.setSach(sachNew);
        hinhAnh.setTenHinhAnh(sachRequest.getTenSach() + " " + "Image" + new Date().getTime());
        hinhAnh.setDuLieuAnh(sachRequest.getHinhAnhBase64());
        hinhAnh.setIcon(true);

        HinhAnh hinhAnhNew = hinhAnhRepository.save(hinhAnh);
        List<HinhAnh> hinhAnhList = new ArrayList<>();
        hinhAnhList.add(hinhAnhNew);
        sach.setDanhSachHinhAnh(hinhAnhList);

        if (sachNew.getMaSach() == sachRequest.getMaSach()) {
            return ResponseEntity.status(200).body(new Message("Cập nhật sách thành công"));
        }
        if (sachNew.getMaSach() != sachRequest.getMaSach()) {
            return ResponseEntity.status(201).body(new Message("Thêm sách thành công"));
        }
        return ResponseEntity.badRequest().body(new Message("Có lỗi xảy ra trong quá trình lưu sách"));
    }

}
