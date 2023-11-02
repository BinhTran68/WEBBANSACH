package com.vn.webbansach_backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "hinh_anh")
public class HinhAnh {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_hinh_anh")
    private int maHinhAnh;

    @Column(name = "ten_hinh_anh", length = 256)
    private String tenHinhAnh;

    @Column(name = "la_icon")
    private boolean isIcon;

    @Column(name = "duong_dan")
    private String link;

    @Column(name = "du_lieu_anh", columnDefinition = "LONGTEXT")
    @Lob
    private String duLieuAnh;

    // 1 quyển sách với nhiều hình ảnh
    // Khi xóa sách thì xóa luôn hình ảnh
    // Khi xóa hình ảnh thì không xóa sách

    @ManyToOne(
            cascade = {
                    CascadeType.PERSIST, CascadeType.DETACH,
                    CascadeType.REFRESH, CascadeType.MERGE
            }
    )
    @JoinColumn(name = "ma_sach", nullable = false) // Bắt buộc phải xác định ảnh này thuộc sách này
    private Sach sach;
}
