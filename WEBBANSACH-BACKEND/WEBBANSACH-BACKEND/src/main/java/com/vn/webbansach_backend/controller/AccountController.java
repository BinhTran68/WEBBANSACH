package com.vn.webbansach_backend.controller;


import com.vn.webbansach_backend.exception.AuthenticationException;
import com.vn.webbansach_backend.request.LoginRequest;
import com.vn.webbansach_backend.request.NguoiDungRequest;
import com.vn.webbansach_backend.response.JwtResponse;
import com.vn.webbansach_backend.security.JwtService;
import com.vn.webbansach_backend.service.AccountService;
import com.vn.webbansach_backend.service.UserDetailsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AccountService accountService;


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userService;

    @Autowired
    private JwtService jwtService;


    @GetMapping("/check-username")
    public boolean exitsUserbyUserName(@RequestParam("username") String tenDangNhap) {
        return accountService.existByTenDangNhap(tenDangNhap);
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody NguoiDungRequest nguoiDungRequest) {
        return accountService.registerUser(nguoiDungRequest);
    }


    @GetMapping("/activated")
    public ResponseEntity<?> activatedAccount(@RequestParam String email,
                                              @RequestParam String activationCode) {
        return accountService.kichHoatTaiKhoan(email, activationCode);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) throws AuthenticationException {


        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );
        if (authentication.isAuthenticated()) {
            final String jwt = jwtService.generateToken(loginRequest.getUsername());
            return ResponseEntity.status(HttpStatus.OK).body(new JwtResponse(jwt));
        }

        throw new AuthenticationException("Tên đăng nhập hoặc mật khẩu không đúng");

    }


}
