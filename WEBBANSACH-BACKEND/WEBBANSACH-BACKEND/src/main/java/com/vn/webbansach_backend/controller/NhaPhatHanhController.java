package com.vn.webbansach_backend.controller;

import com.vn.webbansach_backend.service.NhaPhatHanhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/nha-phat-hanh")
public class NhaPhatHanhController {

    @Autowired
    private NhaPhatHanhService nhaPhatHanhService;

    @GetMapping("/get-by-masach")
    public ResponseEntity<?>  getNhaPhatHanhByMaSach(@RequestParam Integer maSach) {
        return nhaPhatHanhService.getNhaPhatHanhByMaSach(maSach);
    }

}
