package com.example.backend.controller;

import com.example.backend.dto.LoginRequest;
import com.example.backend.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "사용자 관리", description = "사용자 CRUD API")
public class LoginController {

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    @Operation(summary = "사용자 인증", description = "로그인 인증한다.kch")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        Map<String, Object> response = new HashMap<>();

        // 간단한 인증 로직
        if (("test@example.com".equals(username) && "password123".equals(password)) ||
                ("user@test.com".equals(username) && "password".equals(password))) {

            // JWT 토큰 생성
            String token = jwtUtil.generateToken(username);

            // 로그인 성공
            response.put("success", true);
            response.put("message", "Login successful for user: " + username);
            response.put("username", username);
            response.put("token", token); // JWT 토큰 추가

            return ResponseEntity.ok(response);
        } else {
            // 로그인 실패
            response.put("success", false);
            response.put("message", "Invalid username or password");

            return ResponseEntity.status(401).body(response);
        }
    }

    // 보호된 엔드포인트 예시
    @GetMapping("/protected")
    public ResponseEntity<Map<String, Object>> protectedEndpoint(HttpServletRequest request) {
        // JWT 필터에서 인증된 사용자 정보 가져오기
        String username = (String) request.getAttribute("authenticatedUser");

        Map<String, Object> response = new HashMap<>();
        response.put("message", "This is a protected endpoint");
        response.put("authenticatedUser", username);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    public String health() {
        return "Backend server is running!";
    }

    @GetMapping("/")
    public String home() {
        return "Welcome to Backend API!";
    }
}