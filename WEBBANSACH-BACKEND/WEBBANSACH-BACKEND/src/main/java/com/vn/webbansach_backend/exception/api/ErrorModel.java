package com.vn.webbansach_backend.exception.api;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class ErrorModel {

    private String fieldError;

    private String message;

}
