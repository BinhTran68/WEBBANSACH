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

}
