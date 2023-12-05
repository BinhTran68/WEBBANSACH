package com.vn.webbansach_backend.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BookInfoResponse {

    private int maSach;

    private String tenSach;

    private String tenTacGia;

    private String loaiBia;

    private String moTa;

    private String isbn;

    private Boolean hangChinhHang;

    private String nhaPhatHanh;

    private int soTrang;

    private String nhaXuatBan;

    private double giaNiemYet;

    private double giaBan;

    private int soLuong;

    private List<String> stringListTheLoai;

    public BookInfoResponse(int maSach, String tenSach, String tenTacGia, String loaiBia, String moTa, String isbn, Boolean hangChinhHang, String nhaPhatHanh, int soTrang, String nhaXuatBan, double giaNiemYet, double giaBan, int soLuong) {
        this.maSach = maSach;
        this.tenSach = tenSach;
        this.tenTacGia = tenTacGia;
        this.loaiBia = loaiBia;
        this.moTa = moTa;
        this.isbn = isbn;
        this.hangChinhHang = hangChinhHang;
        this.nhaPhatHanh = nhaPhatHanh;
        this.soTrang = soTrang;
        this.nhaXuatBan = nhaXuatBan;
        this.giaNiemYet = giaNiemYet;
        this.giaBan = giaBan;
        this.soLuong = soLuong;
    }
}
