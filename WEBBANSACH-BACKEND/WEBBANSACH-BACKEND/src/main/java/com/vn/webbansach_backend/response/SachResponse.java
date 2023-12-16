package com.vn.webbansach_backend.response;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SachResponse {

    private int maSach;

    private String tenSach;


    private String tenTacGia;

    private String isbn;

    private String link;

    private Boolean hangChinhHang;

    private String nhaPhatHanh;

    private int soTrang;

    private String nhaXuatBan;

    private double giaNiemYet;

    private double giaBan;

    private int soLuong;

    public SachResponse(int maSach, String tenSach, String tenTacGia, String isbn, String link, Boolean hangChinhHang, String nhaPhatHanh, int soTrang, String nhaXuatBan, double giaNiemYet, double giaBan, int soLuong) {
        this.maSach = maSach;
        this.tenSach = tenSach;
        this.tenTacGia = tenTacGia;
        this.isbn = isbn;
        this.link = link;
        this.hangChinhHang = hangChinhHang;
        this.nhaPhatHanh = nhaPhatHanh;
        this.soTrang = soTrang;
        this.nhaXuatBan = nhaXuatBan;
        this.giaNiemYet = giaNiemYet;
        this.giaBan = giaBan;
        this.soLuong = soLuong;
    }


}
