package com.vn.webbansach_backend.entity;

import com.vn.webbansach_backend.constant.StatusCart;
import com.vn.webbansach_backend.entity.base.AuditEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "chi_tiet_don_hang")
public class ChiTietDonHang extends AuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_chi_tiet_don_hang")
    private long maChiTietDonHang;



    private int soLuong;


    private Long giaBan;

    @ManyToOne(
            cascade = {
                    CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE
            }
    )
    @JoinColumn(name = "ma_sach", nullable = false)
    private Sach sach;

    @ManyToOne(
            cascade = {
                    CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE
            }
    )
    @JoinColumn(name = "ma_don_hang", nullable = false)
    private DonHang donHang;
}
