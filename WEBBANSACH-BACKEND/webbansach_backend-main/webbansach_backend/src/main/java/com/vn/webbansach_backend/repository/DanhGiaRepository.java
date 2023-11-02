package com.vn.webbansach_backend.repository;

import com.vn.webbansach_backend.entity.DanhGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path = "danh-gia")
public interface DanhGiaRepository extends JpaRepository<DanhGia, Long> {
}