package com.vn.webbansach_backend.repository;


import com.vn.webbansach_backend.entity.NhaXuatBan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path = "nha-xuat-ban")
public interface NhaXuatBanRepository extends JpaRepository<NhaXuatBan, Integer> {

    @Query("select new NhaXuatBan(nxb.maNhaXuatBan, nxb.tenNhaXuatBan) from NhaXuatBan nxb join Sach  s on s.nhaXuatBanSach.maNhaXuatBan = nxb.maNhaXuatBan where s.maSach = :maSach ")
    NhaXuatBan findNhaXuatBanByMaSach(@Param("maSach") Integer maSach);


}
