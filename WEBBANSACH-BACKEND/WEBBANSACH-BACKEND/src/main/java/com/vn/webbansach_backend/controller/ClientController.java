package com.vn.webbansach_backend.controller;

import com.vn.webbansach_backend.entity.ChiTietDonHang;
import com.vn.webbansach_backend.repository.ChiTietDonHangRepository;
import com.vn.webbansach_backend.service.SachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;


@RestController
@RequestMapping("/api/client")
public class ClientController {


    @Autowired
    private SachService sachService;

    @GetMapping("/get-info-sach")
    ResponseEntity<?> getInfoBookByMaSach(@RequestParam Integer maSach) {
        return sachService.findInfoSachById(maSach);
    }

    @GetMapping("/get-sach-moi-nhat")
    ResponseEntity<?> getNewSach(@RequestParam Integer pageNumber,
                                 @RequestParam Integer pageSize,
                                 @RequestParam String sortBy,
                                 @RequestParam String typeSort,
                                 @RequestParam(value = "priceMin", defaultValue = "0") BigDecimal priceMin,
                                 @RequestParam(value = "priceMax", defaultValue = "999999999") BigDecimal priceMax,
                                 @RequestParam(value = "theLoaiId", defaultValue = "") Integer categoryID,
                                 @RequestParam(value = "publishingCompany", defaultValue = "") Integer publishingCompany, // Nhà phát hành
                                 @RequestParam(value = "publisher  ", defaultValue = "") Integer publisher // Nhà xuất bản
                                 ) {
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


    @GetMapping("/get-new-book")
    public ResponseEntity<?> getNewSachByPageble(@RequestParam Integer pageNumber,
                                         @RequestParam Integer pageSize) {
        System.out.println("hàm chạy vô đây");

        if (pageNumber == null || pageNumber < 0 || pageSize == null || pageSize < 0) {
            return new ResponseEntity<>("Invalid page number or page size", HttpStatus.BAD_REQUEST);
        }
        Pageable pageable  = PageRequest.of(pageNumber, pageSize, Sort.by("maSach").descending());

        return sachService.findNewBookByPage(pageable);
    }



    @GetMapping("/get-book-by-category")
    public ResponseEntity<?> getBookByCategory(@RequestParam Integer pageNumber,
                                              @RequestParam Integer pageSize,
                                               @RequestParam String categoryName
                                               ) {

        if (pageNumber == null || pageNumber < 0 || pageSize == null || pageSize < 0) {
            return new ResponseEntity<>("Invalid page number or page size", HttpStatus.BAD_REQUEST);
        }
        Pageable pageable  = PageRequest.of(pageNumber, pageSize, Sort.by("maSach").descending());

        return sachService.findBookByCategoryName(pageable, categoryName);

    }









}
