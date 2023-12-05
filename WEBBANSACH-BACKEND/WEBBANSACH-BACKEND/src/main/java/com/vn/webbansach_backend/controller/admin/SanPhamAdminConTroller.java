package com.vn.webbansach_backend.controller.admin;


import com.vn.webbansach_backend.request.SachRequest;
import com.vn.webbansach_backend.service.SachService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admin/san-pham")
public class SanPhamAdminConTroller {

    @Autowired
    private SachService sachService;

    @PostMapping(  value = "/add-sach",  consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addBookByBookRequest(@RequestPart("sachRequest") SachRequest sachRequest,
                                                  @RequestParam("bookImg")MultipartFile multipartFile) throws IOException {
        System.out.println(sachRequest.toString());
        System.out.println(multipartFile.getSize());
        System.out.println(multipartFile.getOriginalFilename());

        return sachService.saveBookByRequest(sachRequest, multipartFile);

    }

    @PutMapping(value = "/update-sach")
    public ResponseEntity<?> updateSachById(@RequestBody SachRequest sachRequest) throws IOException {
        System.out.println(sachRequest);
        return sachService.saveBookByRequest(sachRequest,null);
    }

    @GetMapping("/get-book-response")
    public ResponseEntity<?> getAllBookResponse(@RequestParam Integer pageNumber, @RequestParam Integer pageSize, @RequestParam String sortBy, @RequestParam String typeSort ) {

        if (pageNumber == null || pageNumber < 0 || pageSize == null || pageSize < 0) {
            return new ResponseEntity<>("Invalid page number or page size", HttpStatus.BAD_REQUEST);
        }

        if (sortBy == null || sortBy.isEmpty() || typeSort == null || typeSort.isEmpty() ) {
            return new ResponseEntity<>("Invalid sort by or type sort", HttpStatus.BAD_REQUEST);
        }
        Pageable pageable;
        if (typeSort.equals("esc")) {
            pageable =  PageRequest.of(pageNumber, pageSize, Sort.by("maSach").ascending());
        }else  {
            pageable =  PageRequest.of(pageNumber, pageSize, Sort.by("maSach").descending());
        }
        return sachService.getAllSachResponse(pageable);
    }

    @DeleteMapping("/del-sach-by-id/{id}")
    public ResponseEntity<?> delSachById(@PathVariable Integer id) {
        return sachService.delSachById(id);
    }


}
