package com.vn.webbansach_backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.sql.Date;
import java.util.List;
@Data
@Entity
@Table(name = "don_hang")
public class DonHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_don_hang")
    private int maDonHang;

    private Date ngayTao;


    private String diaChiMuaHang;
    private String diaChiNhanHang;

    private double tongTienSanPham;

    private double chiPhiGiaoHang;

    private double chiPhiThanhToan;

    private double tongTien;

    @OneToMany(
            mappedBy = "donHang",
            fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE,CascadeType.REMOVE
    })
    private List<ChiTietDonHang> danhSachChiTietDonHang;

    @ManyToOne(
            cascade = {
                    CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE
            }
    )
    @JoinColumn(name = "ma_nguoi_dung", nullable = false)
    private NguoiDung nguoiDung;


    @ManyToOne(
            cascade = {
                    CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE
            }
    )
    @JoinColumn(name = "ma_hinh_thuc_thanh_toan", nullable = true)
    private HinhThucThanhToan hinhThucThanhToan;


    @ManyToOne(
            cascade = {
                    CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE
            }
    )
    @JoinColumn(name = "ma_hinh_thuc_giao_hang", nullable = true)
    private HinhThucGiaoHang hinhThucGiaoHang;
}
