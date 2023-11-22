package com.vn.webbansach_backend.repository;

import com.vn.webbansach_backend.entity.NhaPhatHanh;
import com.vn.webbansach_backend.entity.TheLoai;
import com.vn.webbansach_backend.response.NhaPhatHanhResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "nha-phat-hanh")
public interface NhaPhatHanhRepository extends JpaRepository<NhaPhatHanh, Integer> {

    @Query("select new com.vn.webbansach_backend.response.NhaPhatHanhResponse(nph.maNhaPhatHanh, nph.tenNhaPhatHanh, nph.diaChi, nph.soDienThoai ) from" +
            " NhaPhatHanh nph join nph.danhSachQuyenSach s where  s.maSach = :maSach")
    NhaPhatHanhResponse getNhaPhatHanhByMaSach(@Param("maSach") Integer maSach);

}
