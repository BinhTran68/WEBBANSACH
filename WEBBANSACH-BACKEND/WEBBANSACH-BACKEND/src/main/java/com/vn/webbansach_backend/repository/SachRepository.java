package com.vn.webbansach_backend.repository;

import com.vn.webbansach_backend.entity.Sach;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
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
        Page<Sach> findByGiaBanIsBetween(@RequestParam ("giaMin") double giaMin, @RequestParam("giaMax") double giaMax, Pageable pageable);


       //   http://localhost:8080/sach/search/findByGiaBanIsBetweenAndDanhSachTheLoaiIn?giaMin=0.0&giaMax=2000000.0&theLoaiIds=1,2&sort=maSach,desc&page=0&size=6
      //  Page<Sach> findByGiaBanIsBetweenAndDanhSachTheLoaiIn(@RequestParam ("giaMin") double giaMin, @RequestParam("giaMax") double giaMax , @RequestParam ("theLoaiIds") List<Integer> theLoaiIds, Pageable pageable);


    // http://localhost:8080/sach/search/findByGiaBanIsBetweenAndDanhSachTheLoaiIn?giaMin=0.0&giaMax=2000000.0&theLoaiIds=1,2&sort=maSach,desc&page=0&size=6
    @Query("SELECT s FROM Sach s JOIN s.danhSachTheLoai tl WHERE s.giaBan BETWEEN :giaMin AND :giaMax AND tl.maTheLoai IN :theLoaiIds")
    Page<Sach> findByGiaBanIsBetweenAndDanhSachTheLoaiIn(@RequestParam ("giaMin") double giaMin, @RequestParam("giaMax") double giaMax , @RequestParam ("theLoaiIds") List<Integer> theLoaiIds, Pageable pageable);


//    @Query(value = "SELECT * FROM sach s JOIN the_loai_sach tls ON s.ma_sach = tls.ma_sach JOIN the_loai tl ON tls.ma_the_loai = tl.ma_the_loai WHERE s.gia_ban BETWEEN :giaMin AND :giaMax AND tl.ma_the_loai IN :theLoaiIds LIMIT :size OFFSET :offset",
//            countQuery = "SELECT count(*) FROM sach s JOIN the_loai_sach tls ON s.ma_sach = tls.ma_sach JOIN the_loai tl ON tls.ma_the_loai = tl.ma_the_loai WHERE s.gia_ban BETWEEN :giaMin AND :giaMax AND tl.ma_the_loai IN :theLoaiIds", nativeQuery = true)
//    Page<Sach> findByGiaBanIsBetweenAndDanhSachTheLoaiIn(@RequestParam ("giaMin") double giaMin, @RequestParam("giaMax") double giaMax , @RequestParam ("theLoaiIds") List<Integer> theLoaiIds, @RequestParam("page") int page, @RequestParam("size") int size);
//



}