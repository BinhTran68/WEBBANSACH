package com.vn.webbansach_backend.repository;


import com.vn.webbansach_backend.entity.NhaXuatBan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "nha-xuat-ban")
public interface NhaXuatBanRepository extends JpaRepository<NhaXuatBan, Integer> {
}
