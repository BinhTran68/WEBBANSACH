package com.vn.webbansach_backend.repository;

import com.vn.webbansach_backend.entity.TheLoai;
import com.vn.webbansach_backend.response.TheLoaiResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@RepositoryRestResource(path = "the-loai")
public interface TheLoaiRepository extends JpaRepository<TheLoai, Integer> {

    @Query("select tl.tenTheLoai, tl.maTheLoai from TheLoai tl Join tl.danhSachQuyenSach s where  s.maSach = :maSach ")
    List<TheLoai> getAllTheLoaiByMaSach(@Param("maSach") Integer maSach);

    @Query("select new com.vn.webbansach_backend.response.TheLoaiResponse( tl.maTheLoai, tl.tenTheLoai ) " +
            " from TheLoai tl Join tl.danhSachQuyenSach s where  s.maSach = :maSach ")
    List<TheLoaiResponse> getAllTheLoaiResponeseByMaSach(@Param("maSach") Integer maSach);

    @Query(value = "SELECT tl.ten_the_loai FROM sach s JOIN sach_theloai stl ON s.ma_sach = stl.ma_sach JOIN the_loai tl ON stl.ma_the_loai = tl.ma_the_loai WHERE s.ma_sach = :maSach", nativeQuery = true)
    List<String> findNameTheLoaiByIdSach(@Param("maSach") Integer maSach);


}