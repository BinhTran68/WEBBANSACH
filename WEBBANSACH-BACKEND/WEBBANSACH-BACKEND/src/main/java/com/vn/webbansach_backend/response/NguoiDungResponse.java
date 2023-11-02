package com.vn.webbansach_backend.response;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NguoiDungResponse {

    private String hoDem;

    private String ten;

    private String tenDangNhap;

    private String matKhau;

    private boolean gioiTinh;

    private String email;

    private String soDienThoai;


}
