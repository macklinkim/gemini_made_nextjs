package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {
    private boolean success;
    private String message;
    private String username;
    private String token;

    // 로그인 실패용 생성자
    public LoginResponseDto(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
