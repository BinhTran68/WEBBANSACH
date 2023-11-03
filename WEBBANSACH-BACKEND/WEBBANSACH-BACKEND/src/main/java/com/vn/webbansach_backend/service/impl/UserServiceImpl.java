package com.vn.webbansach_backend.service.impl;

import com.vn.webbansach_backend.entity.NguoiDung;
import com.vn.webbansach_backend.entity.Quyen;
import com.vn.webbansach_backend.repository.NguoiDungRepository;
import com.vn.webbansach_backend.repository.QuyenRepository;
import com.vn.webbansach_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private QuyenRepository quyenRepository;

    @Override
    public NguoiDung findByUserName(String tenDangNhap) {
        return nguoiDungRepository.findNguoiDungByTenDangNhap(tenDangNhap);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        NguoiDung nguoiDung = findByUserName(username);

        if (nguoiDung == null) {
            throw new UsernameNotFoundException("Tài khoản không tồn tại!");
        }


        return new User(nguoiDung.getTenDangNhap(), nguoiDung.getMatKhau(), rolesToAuthorities(nguoiDung.getDanhSachQuyen()));
    }

    private Collection<? extends GrantedAuthority> rolesToAuthorities(Collection<Quyen> quyens) {
        return quyens.stream().map(quyen -> new SimpleGrantedAuthority(quyen.getTenQuyen())).collect(Collectors.toList());
    }
}
