package com.vn.webbansach_backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.List;
@Data
@Entity
@Table(name = "hinh_thuc_thanh-toan")
public class HinhThucThanhToan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maHinhThucThanhToan;
    private String tenHinhThucThanhToan;
    private String moTa;
    private double chiPhiThanhToan;

    @OneToMany(mappedBy = "hinhThucThanhToan", cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    private List<DonHang> danhSachDonHang;
}
