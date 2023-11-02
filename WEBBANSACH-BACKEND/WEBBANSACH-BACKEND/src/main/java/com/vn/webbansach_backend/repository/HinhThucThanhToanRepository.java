package com.vn.webbansach_backend.repository;

import com.vn.webbansach_backend.entity.HinhThucThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path = "don-hang")
public interface HinhThucThanhToanRepository extends JpaRepository<HinhThucThanhToan, Integer> {
}