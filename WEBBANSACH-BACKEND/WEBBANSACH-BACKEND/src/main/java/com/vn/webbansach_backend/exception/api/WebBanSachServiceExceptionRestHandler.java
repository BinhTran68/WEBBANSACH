package com.vn.webbansach_backend.exception.api;

import com.vn.webbansach_backend.exception.WebBanSachServiceExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


public abstract class WebBanSachServiceExceptionRestHandler<Z extends Exception>
        extends WebBanSachServiceExceptionHandler<ResponseEntity<?>, Z> {

    @Override
    protected ResponseEntity<?> wrap(Z ex) {
        return new ResponseEntity<>(wrapApi(ex), HttpStatus.BAD_REQUEST);
    }

    protected abstract Object wrapApi(Z ex);
}
