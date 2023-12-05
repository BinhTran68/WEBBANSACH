package com.vn.webbansach_backend.request;

import com.vn.webbansach_backend.entity.HinhAnh;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HinhAnhRequest {

    private int maHinhAnh;
    private String tenHinhAnh;
    private boolean isIcon;
    private String  duongDan;
    private String  duLieuAnh;
    private MultipartFile file;


}
