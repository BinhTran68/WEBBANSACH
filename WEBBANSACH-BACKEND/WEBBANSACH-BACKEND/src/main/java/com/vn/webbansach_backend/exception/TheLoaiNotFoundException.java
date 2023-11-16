package com.vn.webbansach_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class TheLoaiNotFoundException extends RuntimeException {

    public TheLoaiNotFoundException(String message) {
        super(message);
    }
}