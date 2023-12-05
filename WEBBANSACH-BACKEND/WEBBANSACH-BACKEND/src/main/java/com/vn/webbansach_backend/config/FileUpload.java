package com.vn.webbansach_backend.config;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileUpload {
    String uploadFile(MultipartFile multipartFile) throws IOException;


    String updateFileByLink(MultipartFile multipartFile, String urlImage);

    void deleteImageAtCloudinary(String urlImage) throws IOException;
}
