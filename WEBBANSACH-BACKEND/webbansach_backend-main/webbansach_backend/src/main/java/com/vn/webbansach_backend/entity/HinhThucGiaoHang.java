package com.vn.webbansach_backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
@Table(name = "hinh_thuc_giao_hang")
public class HinhThucGiaoHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_hinh_thuc_giao_hang")
    private int maHinhThucGiaoHang;

    @Column(name = "ten_hinh_thuc_giao_hang")
    private String tenHinhThucGiaoHang;


    private String moTa;

    private double chiPhiGiaoHang;

    @OneToMany(mappedBy = "hinhThucGiaoHang", cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    private List<DonHang> danhSachDonHang;
}
