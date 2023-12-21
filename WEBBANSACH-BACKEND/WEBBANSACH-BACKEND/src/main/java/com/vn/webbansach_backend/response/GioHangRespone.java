package com.vn.webbansach_backend.response;

import com.vn.webbansach_backend.constant.StatusCart;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@Getter
@Setter
@ToString
@AllArgsConstructor
public class GioHangRespone {

    private Integer maSach;

    private String tenSach;

    private Double giaBan;

    private Double giaNiemYet;

    private int soLuong;

    private int soLuongTonKho;

    private StatusCart statusCart;

    private String linkImage;


}
