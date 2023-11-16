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
@AllArgsConstructor
@NoArgsConstructor
public class SachResponse {

    private int maSach;
    private String tenSach;
    private List<String> tenTheLoai;
    private String tenTacGia;
    private String ISBN;
    private String hinhAnhBase64;
    private Boolean hangChinhHang;
    private String nhaPhatHanh;
    private String dichGia;
    private String loaiBia;
    private int soTrang;
    private int nhaXuatBan;
    private double giaNiemYet;
    private double giaBan;
    private int soLuong;

}
