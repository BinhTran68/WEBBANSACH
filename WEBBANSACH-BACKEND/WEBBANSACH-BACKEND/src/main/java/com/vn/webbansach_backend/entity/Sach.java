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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder(toBuilder = true)
@Table(name = "sach")
public class Sach {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_sach")
    private int maSach;

    @Column(name = "ten_sach", length = 256)
    private String tenSach;

    @Column(name = "ten_tac_gia", length = 256)
    private String tenTacGia;

    @Column(name = "isbn", length = 256)
    private String ISBN;

    @Column(name = "mo_ta", columnDefinition = "text")
    private String moTa;

    private boolean hangChinhHang;

    private String dichGia;

    private String loaiBia;

    private int soTrang;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date ngayXuatBan;

    @Column(name = "gia_niem_yet")
    private double giaNiemYet;

    @Column(name = "gia_ban")
    private double giaBan;

    @Column(name = "so_luong")
    private int soLuong;

    @Column(name = "trung_binh_xep_hang")
    private double trungBinhXepHang;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE
    })
    @JoinTable(
            name = "sach_theloai",
            joinColumns = @JoinColumn(name = "ma_sach"),
            inverseJoinColumns = @JoinColumn(name = "ma_the_loai")
    )
    List<TheLoai> danhSachTheLoai;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE
    })
    @JoinTable(
            name = "sach_nhaphathanh",
            joinColumns = @JoinColumn(name = "ma_sach"),
            inverseJoinColumns = @JoinColumn(name = "ma_nha_phat_hanh")
    )
    List<NhaPhatHanh> danhSachNhaPhatHanh;



    @OneToMany(
            mappedBy = "sach",
            fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE,CascadeType.REMOVE
    })
    List<HinhAnh> danhSachHinhAnh;

    @OneToMany(
            mappedBy = "sach",
            fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE, CascadeType.REMOVE
    })
    List<DanhGia> danhSachDanhGia;

    @OneToMany(
            mappedBy = "sach",
            fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE})
    List<ChiTietDonHang> danhSachChiTietDonHang;

    @OneToMany(
            fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE , CascadeType.REMOVE
    })
    List<SachYeuThich> danhSachYeuThich;


    @ManyToOne(
            cascade = {
                    CascadeType.PERSIST, CascadeType.DETACH,
                    CascadeType.REFRESH, CascadeType.MERGE
            }
    )
    @JoinColumn(name = "ma_nha_xuat_ban", nullable = false) // Bắt buộc phải xác định ảnh này thuộc sách này
    private NhaXuatBan nhaXuatBanSach;



}
