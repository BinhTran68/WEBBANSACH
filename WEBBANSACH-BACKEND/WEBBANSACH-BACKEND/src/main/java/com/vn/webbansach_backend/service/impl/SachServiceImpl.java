package com.vn.webbansach_backend.service.impl;

import com.vn.webbansach_backend.config.FileUpload;
import com.vn.webbansach_backend.entity.HinhAnh;
import com.vn.webbansach_backend.entity.NhaPhatHanh;
import com.vn.webbansach_backend.entity.NhaXuatBan;
import com.vn.webbansach_backend.entity.Sach;
import com.vn.webbansach_backend.entity.TheLoai;
import com.vn.webbansach_backend.exception.NhaPhatHanhNotFoundException;
import com.vn.webbansach_backend.repository.HinhAnhRepository;
import com.vn.webbansach_backend.repository.NhaPhatHanhRepository;
import com.vn.webbansach_backend.repository.NhaXuatBanRepository;
import com.vn.webbansach_backend.repository.SachRepository;
import com.vn.webbansach_backend.repository.TheLoaiRepository;
import com.vn.webbansach_backend.request.SachRequest;
import com.vn.webbansach_backend.response.BookInfoResponse;
import com.vn.webbansach_backend.response.Message;
import com.vn.webbansach_backend.response.SachResponse;
import com.vn.webbansach_backend.service.SachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    @Autowired
    private FileUpload fileUpload;


    @Override
    public ResponseEntity<?> saveBookByRequest(SachRequest sachRequest, MultipartFile multipartFile) throws IOException {

        System.out.println(sachRequest.toString());
        boolean sachExit = sachRepository.existsByMaSach(sachRequest.getMaSach());
        Sach sach;
        if (!sachExit) {
            sach = new Sach();
        } else {
            sach = sachRepository.findById(sachRequest.getMaSach()).orElse(null);
        }
        sach.setMaSach(sachRequest.getMaSach());
        sach.setTenSach(sachRequest.getTenSach());
        sach.setTenTacGia(sach.getTenTacGia());
        sach.setISBN(sachRequest.getISBN());
        sach.setMoTa(sachRequest.getMoTa());
        sach.setTenTacGia(sachRequest.getTenTacGia());
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

        sach.setDanhSachTheLoai(theLoaiList);


        NhaPhatHanh nhaPhatHanh = nhaPhatHanhRepository.findById(sachRequest.getNhaPhatHanh())
                .orElseThrow(() -> new NhaPhatHanhNotFoundException("Nhà phát hành không tồn tại"));

        List<NhaPhatHanh> nhaPhatHanhs = new ArrayList<>();
        nhaPhatHanhs.add(nhaPhatHanh);
        sach.setDanhSachNhaPhatHanh(nhaPhatHanhs);


        NhaXuatBan nhaXuatBan = nhaXuatBanRepository.findById(sachRequest.getNhaXuatBan())
                .orElseThrow(() -> new NhaPhatHanhNotFoundException("Nhà xuất bản không tồn tại"));

        sach.setNhaXuatBanSach(nhaXuatBan);

        Sach sachNew = sachRepository.save(sach);

        if (multipartFile != null) {

            String imageURL = fileUpload.uploadFile(multipartFile);

            HinhAnh hinhAnh = new HinhAnh();
            hinhAnh.setMaHinhAnh(0);
            hinhAnh.setSach(sachNew);
            hinhAnh.setLink(imageURL);
            hinhAnh.setTenHinhAnh(sachRequest.getTenSach() + " " + "Image" + new Date().getTime());
            hinhAnh.setIcon(true);

            HinhAnh hinhAnhNew = hinhAnhRepository.save(hinhAnh);
            List<HinhAnh> hinhAnhList = new ArrayList<>();
            hinhAnhList.add(hinhAnhNew);
            sach.setDanhSachHinhAnh(hinhAnhList);
        }

        if (sachNew.getMaSach() == sachRequest.getMaSach()) {
            return ResponseEntity.status(200).body(new Message("Cập nhật sách thành công"));
        }
        if (sachNew.getMaSach() != sachRequest.getMaSach()) {
            return ResponseEntity.status(201).body(new Message("Thêm sách thành công"));
        }
        return ResponseEntity.badRequest().body(new Message("Có lỗi xảy ra trong quá trình lưu sách"));
    }

    @Override
    public ResponseEntity<?> getAllSachResponse(Pageable pageable) {
        Page<SachResponse> sachPage = sachRepository.getPageSachResponse(pageable);
        System.out.println(sachPage.getTotalElements());
        return ResponseEntity.status(200).body(sachPage);
    }

    @Override
    @Transactional
    public ResponseEntity<Object> delSachById(Integer id) {
        Sach sach = sachRepository.findById(id).orElse(null);
        if (sach == null) {
            return ResponseEntity.notFound().build();
        }
        sachRepository.delete(sach);
        return ResponseEntity.status(204).body(new Message("Xóa thành công"));
    }

    @Override
    public ResponseEntity<?> findInfoSachById(Integer maSach) {
        // Lấy ra danh sách của thể loại,
        // Lấy ra tên nhà xuất bản,
        // Lấy ra tên nhà phát hành
        if (!sachRepository.existsByMaSach(maSach)) {
            return ResponseEntity.notFound().build();
        }

        List<String> nameTheLoai = theLoaiRepository.findNameTheLoaiByIdSach(maSach);

        BookInfoResponse bookInfoResponse = sachRepository.getInfoBookResponseByMaSach(maSach);

        bookInfoResponse.setStringListTheLoai(nameTheLoai);


        return ResponseEntity.ok(bookInfoResponse);
    }

}
