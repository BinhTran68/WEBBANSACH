package com.vn.webbansach_backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "nguoi_dung")
@Data
public class NguoiDung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_nguoi_dung")
    private int maNguoiDung;

    private String hoDem;
    private String ten;
    private String tenDangNhap;

    @Column(name = "mat_khau", length = 512)
    private String matKhau;

    @Column(name = "gioi_tinh")
    private boolean gioiTinh;


    private String email;


    private String soDienThoai;

    private String diaChiGiaoHang;

    private String diaChiMuaHang;

    private boolean daKichHoat;

    private String maKichHoat;

    @OneToMany(
            mappedBy = "nguoiDung",
            fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE , CascadeType.REMOVE
    })
    private List<DanhGia> danhSachDanhGia;

    @OneToMany(
            mappedBy = "nguoiDung",
            fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE , CascadeType.REMOVE
    })
    private List<SachYeuThich> danhSachYeuThich;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
            CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE
    })
    @JoinTable(
            name = "nguoidung_quyen",
            joinColumns = @JoinColumn(name = "ma_nguoi_dung"),
            inverseJoinColumns = @JoinColumn(name = "ma_quyen")
    )
    private List<Quyen> danhSachQuyen;

    @OneToMany(
            mappedBy = "nguoiDung",
            fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE , CascadeType.REMOVE
    })
    private List<DonHang> danhSachDonHang;

}
