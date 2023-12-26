package com.vn.webbansach_backend.repository;

import com.vn.webbansach_backend.constant.StatusCart;
import com.vn.webbansach_backend.entity.GioHang;
import com.vn.webbansach_backend.entity.NguoiDung;
import com.vn.webbansach_backend.entity.Sach;
import com.vn.webbansach_backend.response.GioHangRespone;
import com.vn.webbansach_backend.response.SachResponse;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.SqlResultSetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GioHangRepository extends JpaRepository<GioHang, Integer> {


    @Query("select new com.vn.webbansach_backend.response.GioHangRespone(s.maSach, s.tenSach, s.giaBan, s.giaNiemYet, gh.soLuong, s.soLuong, gh.statusCart, ha.link) " +
            " from NguoiDung  n join n.danhSachGioHang gh join gh.sach s join s.danhSachHinhAnh ha where (ha.isIcon = true or ha.link is null)  and n.maNguoiDung = :maNguoiDung ")
    List<GioHangRespone> getAllBookCartByMaNguoiDung(@Param("maNguoiDung") int maNguoiDung);


    @Query("select gh from  GioHang gh where gh.sach.maSach = :maSach and gh.nguoiDung.maNguoiDung = :maNguoiDung")
    GioHang findGioHangByMaSachAndMaNguoiDung(@Param("maSach") int maSach, @Param("maNguoiDung") int maNguoiDung);

    GioHang findGioHangByNguoiDungAndSach(NguoiDung nguoiDung, Sach sach);

}
