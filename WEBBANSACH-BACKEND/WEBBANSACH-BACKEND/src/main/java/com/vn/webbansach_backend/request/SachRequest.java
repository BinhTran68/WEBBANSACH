package com.vn.webbansach_backend.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class SachRequest {

    @NotBlank
    private int maSach;
    @NotNull
    @NotBlank
    private String tenSach;

    @Size(min = 1, message = "Không được để trống thể loại sách")
    private List<Integer> maTheLoai;

    @Size(min = 3, max = 50, message = "Tên sách quá dài hoặc quá ngắn ")
    @NotBlank(message = "Tên sách không được để trống")
    private String tenTacGia;
    private String ISBN;
    private String moTa;
    private String hinhAnhBase64;
    private Boolean hangChinhHang;
    private int nhaPhatHanh;
    private String dichGia;
    private String loaiBia;
    private int soTrang;
    private int nhaXuatBan;
    private double giaNiemYet;
    private double giaBan;
    private int soLuong;


}
