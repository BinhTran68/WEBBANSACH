package com.vn.webbansach_backend.exception;


import com.vn.webbansach_backend.exception.api.ApiError;
import com.vn.webbansach_backend.exception.api.CustomException;
import com.vn.webbansach_backend.exception.api.ErrorModel;
import com.vn.webbansach_backend.exception.api.RestApiException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Path;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handlerException(Exception ex) {
        if (ex instanceof RestApiException) {
            ApiError apiError = new ApiError(ex.getMessage());
            return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
        } else if (ex instanceof ConstraintViolationException) {
            Set<ConstraintViolation<?>> violations = ((ConstraintViolationException) ex).getConstraintViolations();
            List<ErrorModel> errors = violations.stream()
                    .map(violation ->
                            new ErrorModel(getPropertyName(violation.getPropertyPath()), violation.getMessage()))
                    .collect(Collectors.toList());
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        } else if (ex instanceof CustomException) {
            ApiError apiError = new ApiError(ex.getMessage());
            return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
        } else if (ex instanceof NoSuchElementException) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> handleAuthenticationException(AuthenticationException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }




    @ExceptionHandler(TheLoaiNotFoundException.class)
    public ResponseEntity<Object> handleTheLoaiNotFoundException(TheLoaiNotFoundException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", new Date());
        body.put("status", HttpStatus.NOT_FOUND.value());
        body.put("message", ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(SachNotFoundException.class)
    public ResponseEntity<Object> handleSachNotFoundException(SachNotFoundException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", new Date());
        body.put("status", HttpStatus.NOT_FOUND.value());
        body.put("message", ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> handleSachNotFoundException(ResourceNotFoundException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", new Date());
        body.put("status", HttpStatus.NOT_FOUND.value());
        body.put("message", ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleException(MethodArgumentNotValidException ex){
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return errors;
    }


    private String getPropertyName(Path path) {
        String pathStr = path.toString();
        String[] comps = pathStr.split("\\.");
        if (comps.length > 0) {
            return comps[comps.length - 1];
        } else {
            return pathStr;
        }
    }




}
