package com.vn.webbansach_backend.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    @NotBlank(message = "UserName không được để trống")
    @NotNull(message = "UserName không được để trống")
    private String userName;

    @NotBlank(message = "Password không được để trống")
    @NotNull(message = "Password không được để trống")
    private String password;

}
