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

import java.util.Date;

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

    private Date ngayCapNhat;


    @ManyToOne(
            cascade = {
                    CascadeType.PERSIST, CascadeType.DETACH,
                    CascadeType.REFRESH, CascadeType.MERGE
            }
    )
    @JoinColumn(name = "ma_sach", nullable = true)
    private Sach sach;
}
