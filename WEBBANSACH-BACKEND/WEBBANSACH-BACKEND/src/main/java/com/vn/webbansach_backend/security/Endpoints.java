package com.vn.webbansach_backend.security;

public class Endpoints {

    public static final String front_end_host = "http://localhost:3000";

    public static final String[] PUBLIC_GET_ENDPOINTS = {
            "/sach",
            "/sach/**",
            "/hinh-anh",
            "/the-loai",
            "/hinh-anh/**",
            "/nguoi-dung/search/**",
            "/api/account/**",
            "/api/account/activated",
            "/nha-xuat-ban",
            "/nha-xuat-ban/**",
            "/nha-phat-hanh",
            "/nha-phat-hanh/search/**",
            "/api/the-loai/get-theloai-by-id-sach",
            "/api/nha-xuat-ban/get-by-masach",
            "/api/admin/san-pham/get-book-response/**",
            "/api/nha-phat-hanh/get-by-masach"


    };

    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/api/account/register",
            "/api/account/login",



    };

    public static final String[] ADMIN_GET_ENDPOINTS = {
            "/nguoi-dung",
            "/nguoi-dung/**",

    };

    public static final String[] ADMIN_POST_ENDPOINTS = {
            "/api/admin/san-pham/**"
    };

}
