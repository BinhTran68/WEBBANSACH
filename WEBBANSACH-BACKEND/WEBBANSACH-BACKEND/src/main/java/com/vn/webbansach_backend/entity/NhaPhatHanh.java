package com.vn.webbansach_backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table
public class NhaPhatHanh {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maNhaPhatHanh;

    @Column(unique = true, length = 50)
    private String tenNhaPhatHanh;

    @Column(unique = false, length = 50)
    private String diaChi;

    @Column(unique = true, length = 10)
    private String soDienThoai;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE
    })
    @JoinTable(
            name = "sach_nhaphathanh",
            joinColumns = @JoinColumn(name = "ma_nha_phat_hanh"),
            inverseJoinColumns = @JoinColumn(name = "ma_sach")
    )
    private List<Sach> danhSachQuyenSach;

}
