package com.example.backend.controller;

import com.example.backend.dto.LoginRequestDto;
import com.example.backend.dto.LoginResponseDto;
import com.example.backend.dto.ProtectedResponseDto;
import com.example.backend.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "사용자 관리", description = "사용자 CRUD API")
public class LoginController {

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    @Operation(summary = "사용자 로그인", description = "사용자 이메일과 비밀번호로 로그인하여 JWT 토큰을 발급합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그인 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = LoginResponseDto.class))),
            @ApiResponse(responseCode = "401", description = "잘못된 이메일 또는 비밀번호",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = LoginResponseDto.class)))
    })
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        // 간단한 인증 로직
        if (("test@example.com".equals(username) && "password123".equals(password)) ||
                ("user@test.com".equals(username) && "password".equals(password))) {

            // JWT 토큰 생성
            String token = jwtUtil.generateToken(username);

            // 로그인 성공
            LoginResponseDto response = new LoginResponseDto(true, "Login successful for user: " + username, username, token);
            return ResponseEntity.ok(response);
        } else {
            // 로그인 실패
            LoginResponseDto response = new LoginResponseDto(false, "Invalid username or password", null, null);
            return ResponseEntity.status(401).body(response);
        }
    }

    // 보호된 엔드포인트 예시
    @GetMapping("/protected")
    @Operation(summary = "보호된 엔드포인트", description = "JWT 토큰으로 인증된 사용자만 접근 가능한 엔드포인트입니다.")
    @ApiResponse(responseCode = "200", description = "성공")
    public ResponseEntity<ProtectedResponseDto> protectedEndpoint(HttpServletRequest request) {
        // JWT 필터에서 인증된 사용자 정보 가져오기
        String username = (String) request.getAttribute("authenticatedUser");

        ProtectedResponseDto response = new ProtectedResponseDto(
                "This is a protected endpoint",
                username
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    @Operation(summary = "서버 상태 확인", description = "백엔드 서버의 실행 상태를 확인합니다.")
    @ApiResponse(responseCode = "200", description = "서버 실행 중", content = @Content(mediaType = "text/plain", schema = @Schema(example = "Backend server is running!")))
    public String health() {
        return "Backend server is running!";
    }

    @GetMapping("/")
    @Operation(summary = "루트 엔드포인트", description = "API의 루트 엔드포인트입니다.")
    @ApiResponse(responseCode = "200", description = "성공", content = @Content(mediaType = "text/plain", schema = @Schema(example = "Welcome to Backend API!")))
    public String home() {
        return "Welcome to Backend API!";
    }
}