package com.vn.webbansach_backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "nha_xuat_ban")
public class NhaXuatBan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_nha_xuat_ban")
    private int maNhaXuatBan;

    @Column(unique = true, length = 50)
    private String tenNhaXuatBan;

    @Column(unique = false, length = 50)
    private String diachiNhaXuatBan;

    @Column(unique = true, length = 20)
    private String sdtNhaXuatBan;

    @Column(unique = true, length = 50)
    private String emailNhaXuatBan;

    @Column(unique = true, length = 50)
    private String websiteNhaXuatBan;

    @Column(unique = true, length = 50)
    private String masothueNhaXuatBan;

    private Date ngaythanhlapNhaXuatBan;


    @OneToMany(
            mappedBy = "nhaXuatBanSach",
            fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE,CascadeType.REMOVE
    })
    List<Sach> danhSachQuyenSach;

    public NhaXuatBan(int maNhaXuatBan, String tenNhaXuatBan) {
        this.maNhaXuatBan = maNhaXuatBan;
        this.tenNhaXuatBan = tenNhaXuatBan;
    }
}
