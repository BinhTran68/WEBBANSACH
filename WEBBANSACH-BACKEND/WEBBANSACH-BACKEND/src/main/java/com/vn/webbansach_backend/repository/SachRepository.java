package com.vn.webbansach_backend.repository;

import com.vn.webbansach_backend.entity.Sach;
import com.vn.webbansach_backend.response.SachResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


@RepositoryRestResource(path = "sach")
@Repository
public interface SachRepository extends JpaRepository<Sach, Integer> {

    Page<Sach> findByTenSachContaining(@RequestParam("tenSach") String tenSach, Pageable pageable);

    Page<Sach> findByDanhSachTheLoai_MaTheLoai(@RequestParam("maTheLoai") int maTheLoai, Pageable pageable);

    Page<Sach> findByTenSachContainingAndDanhSachTheLoai_MaTheLoai(@RequestParam("tenSach") String tenSach, @RequestParam("maTheLoai") int maTheLoai, Pageable pageable);


    //    http://localhost:8080/sach/search/findByGiaBanIsBetween?giaMin=2000&giaMax=20000&sort=maSach,desc&page=0&size=6
    Page<Sach> findByGiaBanIsBetween(@RequestParam("giaMin") double giaMin, @RequestParam("giaMax") double giaMax, Pageable pageable);


    //   http://localhost:8080/sach/search/findByGiaBanIsBetweenAndDanhSachTheLoaiIn?giaMin=0.0&giaMax=2000000.0&theLoaiIds=1,2&sort=maSach,desc&page=0&size=6
    //  Page<Sach> findByGiaBanIsBetweenAndDanhSachTheLoaiIn(@RequestParam ("giaMin") double giaMin, @RequestParam("giaMax") double giaMax , @RequestParam ("theLoaiIds") List<Integer> theLoaiIds, Pageable pageable);


    // http://localhost:8080/sach/search/findByGiaBanIsBetweenAndDanhSachTheLoaiIn?giaMin=0.0&giaMax=2000000.0&theLoaiIds=1,2&sort=maSach,desc&page=0&size=6
    @Query("SELECT s FROM Sach s JOIN s.danhSachTheLoai tl WHERE s.giaBan BETWEEN :giaMin AND :giaMax AND tl.maTheLoai IN :theLoaiIds")
    Page<Sach> findByGiaBanIsBetweenAndDanhSachTheLoaiIn(@RequestParam("giaMin") double giaMin, @RequestParam("giaMax") double giaMax, @RequestParam("theLoaiIds") List<Integer> theLoaiIds, Pageable pageable);


//    @Query(value = "SELECT * FROM sach s JOIN the_loai_sach tls ON s.ma_sach = tls.ma_sach JOIN the_loai tl ON tls.ma_the_loai = tl.ma_the_loai WHERE s.gia_ban BETWEEN :giaMin AND :giaMax AND tl.ma_the_loai IN :theLoaiIds LIMIT :size OFFSET :offset",
//            countQuery = "SELECT count(*) FROM sach s JOIN the_loai_sach tls ON s.ma_sach = tls.ma_sach JOIN the_loai tl ON tls.ma_the_loai = tl.ma_the_loai WHERE s.gia_ban BETWEEN :giaMin AND :giaMax AND tl.ma_the_loai IN :theLoaiIds", nativeQuery = true)
//    Page<Sach> findByGiaBanIsBetweenAndDanhSachTheLoaiIn(@RequestParam ("giaMin") double giaMin, @RequestParam("giaMax") double giaMax , @RequestParam ("theLoaiIds") List<Integer> theLoaiIds, @RequestParam("page") int page, @RequestParam("size") int size);
//

    boolean existsByMaSach(Integer maSach);


//    @Query(value = "SELECT new com.vn.webbansach_backend.response.SachResponse(s.ma_sach, s.ten_sach, s.ten_tac_gia," +
//            " s.isbn, ha.du_lieu_anh, s.hang_chinh_hang,  nph.ten_nha_phat_hanh, s.so_trang, nxb.ten_nha_xuat_ban," +
//            " s.gia_niem_yet, s.gia_niem_yet, s.gia_ban, s.so_luong)" +
//            " FROM sach s" +
//            " LEFT JOIN sach_theloai stl ON s.ma_sach = stl.ma_sach" +
//            " LEFT JOIN the_loai tl ON stl.ma_the_loai = tl.ma_the_loai" +
//            " LEFT JOIN hinh_anh ha ON s.ma_sach = ha.ma_sach " +
//            " LEFT JOIN nha_phat_hanh nph ON s.ma_sach = nph.ma_nha_phat_hanh" +
//            " LEFT JOIN nha_xuat_ban nxb ON s.ma_nha_xuat_ban = s.ma_sach" +
//            " WHERE ha.la_icon = 1 " +
//            " GROUP BY s.ten_sach", nativeQuery = true)
//    Page<SachResponse> getPageSachResponse(Pageable pageable);


    @Query(value = " SELECT DISTINCT  new com.vn.webbansach_backend.response.SachResponse(s.maSach, s.tenSach, s.tenTacGia," +
            " s.ISBN, ha.duLieuAnh , s.hangChinhHang , nph.tenNhaPhatHanh , s.soTrang, nxb.tenNhaXuatBan ," +
            " s.giaNiemYet, s.giaBan, s.soLuong)" +
            " FROM Sach s left JOIN s.danhSachHinhAnh ha" + " left JOIN s.danhSachNhaPhatHanh nph " +
            " LEFT JOIN s.nhaXuatBanSach nxb" + " WHERE ha.isIcon = true or ha.duLieuAnh is null " ,nativeQuery = false)
    Page<SachResponse> getPageSachResponse(Pageable pageable);



}