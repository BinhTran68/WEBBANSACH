package com.vn.webbansach_backend.controller.admin;

import com.vn.webbansach_backend.entity.HinhAnh;
import com.vn.webbansach_backend.request.HinhAnhRequest;
import com.vn.webbansach_backend.service.HinhAnhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admin/hinh-anh")
public class HinhAnhController {

    @Autowired
    private HinhAnhService hinhAnhService;


    @PostMapping(value = "/update-hinh-anh", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadFiles(@RequestParam("maSach") Integer maSach ,@RequestParam("files") MultipartFile[] files, @RequestPart("idImage") Integer [] ids ) throws IOException {
        return hinhAnhService.updateImageBookAccordingtoIdAndSaveFile(maSach,files,ids);
    }


    @DeleteMapping(value = "/del-by-id")
    public  ResponseEntity<?> delImageById(@RequestParam Integer maHinhAnh) throws IOException {
        return hinhAnhService.deleById(maHinhAnh);
    }





}
