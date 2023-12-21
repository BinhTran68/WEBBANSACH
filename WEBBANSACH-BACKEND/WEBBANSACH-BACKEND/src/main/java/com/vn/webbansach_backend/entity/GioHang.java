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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "gio_hang")
public class GioHang  extends AuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maGioHang;

    private StatusCart statusCart;

    private Long tongTien;

    private int soLuong;

    @ManyToOne(
            cascade = {
                    CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE
            }
    )
    @JoinColumn(name = "ma_nguoi_dung", nullable = false)
    private NguoiDung nguoiDung;


    @ManyToOne(
            cascade = {
                    CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE
            }
    )
    @JoinColumn(name = "ma_sach", nullable = false)
    private Sach sach;


}
