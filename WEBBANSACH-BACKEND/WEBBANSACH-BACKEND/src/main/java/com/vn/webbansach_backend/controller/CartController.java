package com.vn.webbansach_backend.controller;


import com.vn.webbansach_backend.security.JwtService;
import com.vn.webbansach_backend.service.GioHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/cart")
public class CartController {


    @Autowired
    private JwtService jwtService;

    @Autowired
    private GioHangService gioHangService;

    @GetMapping("/get-product-bycart")
    public ResponseEntity<?> getAllBookByCartUser(@RequestHeader(name = "Authorization") String token ) {

        token = token.substring(7);

        return gioHangService.getAllProductByCart(token);
    }


    @PostMapping("/add-product-to-cart")
    public ResponseEntity<?> addProductToCartUser(@RequestHeader(name = "Authorization") String token, @RequestParam("maSach") Integer maSach,@RequestParam(value = "soLuong", defaultValue = 1+"") Integer soLuong) {

        token = token.substring(7);

        return gioHangService.addProductToCartUser(token,maSach,soLuong);
    }


}
