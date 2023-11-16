package com.vn.webbansach_backend.controller.admin;


import com.vn.webbansach_backend.request.SachRequest;
import com.vn.webbansach_backend.service.SachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admin/san-pham")
public class SanPhamAdminConTroller {

    @Autowired
    private SachService sachService;

    @PostMapping("/add-sach")
    public ResponseEntity<?> addBookByBookRequest(@RequestBody SachRequest sachRequest){
        return sachService.saveBookByRequest(sachRequest);
    }

}
