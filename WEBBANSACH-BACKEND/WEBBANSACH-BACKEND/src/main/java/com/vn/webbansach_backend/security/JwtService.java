package com.vn.webbansach_backend.security;

import com.vn.webbansach_backend.entity.NguoiDung;
import com.vn.webbansach_backend.entity.Quyen;
import com.vn.webbansach_backend.service.impl.UserDetailsServiceImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtService {

    // khóa bí mật để ban hanfnh token
    public static final String SECRET = "hfhfhfhfhfhhhhhhhhhhhhhdhdhdhdhdhhddddd1234569999kkkkkkkkklfnfndkdkd";

    @Autowired
    private UserDetailsServiceImpl userDetailsService;


    // tạo ra jwwt dự trên tên đăng nhập

    // Lấy thêm role từ database add và claims để front-end lấy ra được roles của người dùng

    public String generateToken(String tenDangNhap) {
        Map<String, Object> claims = new HashMap<>();
        NguoiDung nguoiDung = userDetailsService.findByUserName(tenDangNhap);
        if (nguoiDung != null && nguoiDung.getDanhSachQuyen().size() > 0) {
            List<Quyen> quyenList = nguoiDung.getDanhSachQuyen();
            List<String> roles = new ArrayList<>();
            quyenList.forEach((role) -> {
                roles.add(role.getTenQuyen());
            });
            claims.put("roles", roles);
        }
        return createToken(claims, tenDangNhap);
    }

    // tạo Jwt với các claim đã chọn;

    private String createToken(Map<String, Object> claims, String userName) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 30 * 60 * 10000)) /// 30 phút
                .signWith(SignatureAlgorithm.HS256, getSigneKey())
                .compact();
    }

    // Lấy secrect key.

    // Chuyeent từ text sang key
    private Key getSigneKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }


    // Hàm extract ra userName .

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(getSigneKey()).parseClaimsJws(token).getBody();

    }

    // Trích xuất thông tin cho 1 claims

    public <T> T extractClaim(String token, Function<Claims, T> claimsTFunction) {
        final Claims claims = extractAllClaims(token);
        return claimsTFunction.apply(claims);
    }

    // Kiểm tra thời gian từ jwt

    public Date extractExpirationToken(String token) {
        return extractClaim(token, claims -> claims.getExpiration());   // Lấy ra thời gian hết hạn của Jwt
    }

    public String extractUserName(String token) {
        return extractClaim(token, claims -> claims.getSubject());
    }

    // Kiểm tra token có hợp lệ hay không

    private Boolean isTokenExpired(String token) {
        return extractExpirationToken(token).before(new Date());
    }

    //   Kiểm tra tính hợp lệ
    public  Boolean validDateToken(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }



}
