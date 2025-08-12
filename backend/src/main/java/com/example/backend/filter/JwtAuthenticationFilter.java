package com.example.backend.filter;

import com.example.backend.util.JwtUtil;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class JwtAuthenticationFilter implements Filter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtUtil jwtUtil;

    // 인증이 필요없는 경로들
    private static final List<String> EXCLUDED_PATHS = Arrays.asList(
            "/login", "/health", "/", "/register", "/error"
    );

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String requestURI = httpRequest.getRequestURI();
        String method = httpRequest.getMethod();

        logger.info("JWT Filter - Processing: {} {}", method, requestURI);

        // OPTIONS 요청은 통과 (CORS preflight)
        if ("OPTIONS".equalsIgnoreCase(method)) {
            chain.doFilter(request, response);
            return;
        }

        // 제외 경로 확인
        if (isExcludedPath(requestURI)) {
            logger.info("JWT Filter - Excluded path, skipping authentication: {}", requestURI);
            chain.doFilter(request, response);
            return;
        }

        // Authorization 헤더에서 JWT 토큰 추출
        String authHeader = httpRequest.getHeader("Authorization");
        String token = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7); // "Bearer " 제거
            try {
                username = jwtUtil.extractUsername(token);
                logger.info("JWT Filter - Extracted username: {}", username);
            } catch (Exception e) {
                logger.error("JWT Filter - Token parsing error: {}", e.getMessage());
            }
        } else {
            logger.warn("JWT Filter - No Bearer token found in Authorization header");
        }

        // 토큰 검증 및 인증 설정
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (jwtUtil.validateToken(token, username)) {
                logger.info("JWT Filter - Token validated successfully for user: {}", username);

                // Spring Security 컨텍스트에 인증 정보 설정
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(username, null, null);
                SecurityContextHolder.getContext().setAuthentication(authToken);

                // 요청에 사용자 정보 추가 (선택사항)
                httpRequest.setAttribute("authenticatedUser", username);
            } else {
                logger.warn("JWT Filter - Token validation failed for user: {}", username);
                sendUnauthorizedResponse(httpResponse, "Invalid or expired token");
                return;
            }
        } else if (username == null && authHeader != null) {
            logger.warn("JWT Filter - Could not extract username from token");
            sendUnauthorizedResponse(httpResponse, "Invalid token format");
            return;
        } else {
            logger.warn("JWT Filter - No token provided for protected resource");
            sendUnauthorizedResponse(httpResponse, "Authentication required");
            return;
        }

        chain.doFilter(request, response);
    }

    private boolean isExcludedPath(String requestURI) {
        return EXCLUDED_PATHS.stream().anyMatch(requestURI::startsWith);
    }

    private void sendUnauthorizedResponse(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String jsonResponse = String.format(
                "{\"success\": false, \"message\": \"%s\", \"status\": 401}",
                message
        );

        response.getWriter().write(jsonResponse);
        response.getWriter().flush();
    }
}