package com.vn.webbansach_backend.security;

public class Endpoints {

    public static final String[] PUBLIC_GET_ENDPOINTS = {
            "/sach",
            "/sach/**",
            "/hinh-anh",
            "/hinh-anh/**",
            "/nguoi-dung/search/**"

    };

    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/api/account/register"
    };

}
