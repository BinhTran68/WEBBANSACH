package com.vn.webbansach_backend.security;

import com.vn.webbansach_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserService userService) {
        // tạo ra công cụ xác thực

        DaoAuthenticationProvider dap = new DaoAuthenticationProvider();
        dap.setUserDetailsService(userService);
        dap.setPasswordEncoder(passwordEncoder());
        return dap;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(
          config ->config
                    .requestMatchers(HttpMethod.GET, Endpoints.PUBLIC_GET_ENDPOINTS).permitAll()
                    .requestMatchers(HttpMethod.POST, Endpoints.PUBLIC_POST_ENDPOINTS).permitAll()


        );

        http.httpBasic(Customizer.withDefaults());
        http.csrf(csrf -> csrf.disable());

        return http.build();
    }



}
