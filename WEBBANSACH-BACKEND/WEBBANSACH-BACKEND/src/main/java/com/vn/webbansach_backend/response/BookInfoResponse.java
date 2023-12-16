package com.vn.webbansach_backend.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class BookInfoResponse {

    private Integer maSach;

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

    private float trungBinhXepHang;


    private List<String> stringListTheLoai;

    public BookInfoResponse(Integer maSach, String tenSach, String tenTacGia, String loaiBia, String moTa, String isbn, Boolean hangChinhHang, String nhaPhatHanh, int soTrang, String nhaXuatBan, double giaNiemYet, double giaBan, int soLuong) {
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

    public BookInfoResponse(int maSach, String tenSach, String tenTacGia, String moTa, double giaNiemYet, double giaBan) {
        this.maSach = maSach;
        this.tenSach = tenSach;
        this.tenTacGia = tenTacGia;
        this.moTa = moTa;
        this.giaNiemYet = giaNiemYet;
        this.giaBan = giaBan;
    }

    public BookInfoResponse(int maSach, String tenSach, String tenTacGia, String loaiBia, String moTa, String isbn, Boolean hangChinhHang, String nhaPhatHanh, int soTrang, String nhaXuatBan, double giaNiemYet, double giaBan, int soLuong, float trungBinhXepHang, List<String> stringListTheLoai) {
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
        this.trungBinhXepHang = trungBinhXepHang;
        this.stringListTheLoai = stringListTheLoai;
    }


    public BookInfoResponse(Integer maSach, String tenSach, String moTa, double giaNiemYet, double giaBan, float trungBinhXepHang) {
        this.maSach = maSach;
        this.tenSach = tenSach;
        this.moTa = moTa;
        this.giaNiemYet = giaNiemYet;
        this.giaBan = giaBan;
        this.trungBinhXepHang = trungBinhXepHang;
    }


}
