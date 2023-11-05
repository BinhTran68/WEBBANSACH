package com.vn.webbansach_backend.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NguoiDungRequest {


    @Size(min = 2,max = 100, message = "Họ đệm phải có độ dài từ 2 đến 100 ký tự")
    @NotBlank(message = "Họ đệm sản phẩm không được để trống")
    private String hoDem;

    @Size(min = 2,max = 100, message = "Tên phải có độ dài từ 2 đến 100 ký tự")
    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String ten;

    @Size(min = 2,max = 100, message = "Tên đăng nhập phải có độ dài từ 2 đến 100 ký tự")
    @NotBlank(message = "Họ đệm sản phẩm không được để trống")
    private String tenDangNhap;

    @Pattern(regexp = "^(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$", message = "Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)")
    private String matKhau;


    private boolean gioiTinh;

    @Pattern( regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" , message = "Email không hợp lệ")
    private String email;

    @Pattern(
            regexp = "(84|0[3|5|7|8|9])+([0-9]{8})\\b",
            message = "Số điện thoại không hợp lệ"
    )
    private String soDienThoai;


}
