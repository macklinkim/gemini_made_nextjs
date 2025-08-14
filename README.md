# Spring Boot & Next.js 학습 프로젝트

Spring Boot 백엔드와 Next.js 프론트엔드 통합을 학습하고 실습하기 위한 프로젝트다.
자동 빌드, 테스트, 배포를 위한 CI/CD 파이프라인 설정도 포함한다.

## 기술 스택

### Backend (Spring Boot)

* **Java 11**
* **Spring Boot**
* **Spring Security** (인증·인가)
* **JWT (JSON Web Tokens)** – API 보안을 위한 토큰 방식
* **Gradle** – 의존성 관리
* **Swagger/OpenAPI** – API 문서화

### Frontend (Next.js)

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**

### CI/CD

* **GitLab CI**
* **GitHub Actions**

## 프로젝트 구조

이 프로젝트는 `backend`와 `frontend` 두 부분으로 구성된다.

```
.
├── backend/         # Spring Boot 애플리케이션
│   ├── build.gradle
│   ├── src/
│   │   └── main/
│   │       └── java/
│   │           └── com/example/backend/
│   │               ├── config/         # Security, Swagger, Web 설정
│   │               ├── controller/     # API 엔드포인트
│   │               ├── dto/            # 데이터 전송 객체
│   │               ├── exception/      # 전역 예외 처리
│   │               ├── filter/         # JWT 및 로깅 필터
│   │               ├── interceptor/    # 요청 인터셉터
│   │               ├── scheduled/      # 스케줄러 작업
│   │               └── util/           # 유틸리티 클래스 (예: JwtUtil)
│   └── ...
├── frontend/        # Next.js 애플리케이션
│   ├── package.json
│   ├── src/
│   │   └── app/
│   │       ├── dashboard/
│   │       ├── login/
│   │       └── ...
│   └── ...
├── .github/         # GitHub Actions 워크플로우
│   └── workflows/
│       ├── ci-pipeline.yml
│       └── deploy.yml
└── .gitlab-ci.yml   # GitLab CI 설정
```

## 백엔드 기능

Spring Boot 기반 백엔드에서 제공하는 주요 기능은 다음과 같다.

* **RESTful API** – 프론트엔드가 사용할 RESTful 엔드포인트 제공
* **보안** – Spring Security와 JWT를 사용

  * `SecurityConfig.java` – 시큐리티 필터 체인, 패스워드 인코더, 공개 엔드포인트 설정
  * `JwtAuthenticationFilter.java` – JWT 유효성 검증 필터
  * `JwtUtil.java` – JWT 생성 및 검증 유틸리티 클래스
* **API 문서화** – Swagger/OpenAPI 연동

  * `SwaggerConfig.java` – Swagger 설정
* **로깅**

  * `RequestResponseLoggingFilter.java` – 요청·응답 로깅
  * `LoggingInterceptor.java` – 인터셉터 기반 로깅
* **에러 처리**

  * `GlobalExceptionHandler.java` – 전역 예외 처리 및 일관된 에러 응답 반환
* **비동기 처리**

  * `ThreadConfig.java` – 비동기 작업을 위한 스레드 풀 설정
* **스케줄링 작업**

  * `ScheduledTasks.java` – 예약 실행 작업 예제 포함

##  시작하기

### 사전 준비

* Java 11 이상
* Gradle
* Node.js 및 npm

### 백엔드 실행

1. `backend` 디렉토리로 이동

   ```bash
   cd backend
   ```
2. Gradle로 빌드

   ```bash
   ./gradlew build
   ```
3. 애플리케이션 실행

   ```bash
   ./gradlew bootRun
   ```

백엔드 서버는 `http://localhost:8080`에서 실행된다.

### 프론트엔드 실행

1. `frontend` 디렉토리로 이동

   ```bash
   cd frontend
   ```
2. 의존성 설치

   ```bash
   npm install
   ```
3. 개발 서버 시작

   ```bash
   npm run dev
   ```

프론트엔드는 `http://localhost:3000`에서 실행된다.

##  CI/CD

이 프로젝트는 GitLab과 GitHub 모두에서 CI/CD 파이프라인을 사용하도록 설정되어 있다.

* **`.gitlab-ci.yml`** – GitLab CI 파이프라인 정의
  빌드, 테스트, 배포를 모두 설정 가능
* **`.github/workflows/`** – GitHub Actions 워크플로우

  * `ci-pipeline.yml` – 빌드 및 테스트용 CI 워크플로우
  * `deploy.yml` – 지속적 배포(CD) 워크플로우

이 파이프라인은 소프트웨어 개발 생명주기를 자동화하고, 모든 변경 사항이 자동으로 테스트 및 배포되도록 구성되어 있다.


---
## 영문버전




# Spring Boot & Next.js Study Project

This is a study project to learn and practice the integration of a Spring Boot backend with a Next.js frontend. The project also includes setting up CI/CD pipelines for automated building, testing, and deployment.

##  Tech Stack

### Backend (Spring Boot)

*   **Java 11**
*   **Spring Boot**
*   **Spring Security** (for authentication/authorization)
*   **JWT (JSON Web Tokens)** for securing APIs
*   **Gradle** (for dependency management)
*   **Swagger/OpenAPI** (for API documentation)

### Frontend (Next.js)

*   **Next.js**
*   **React**
*   **TypeScript**
*   **Tailwind CSS**

### CI/CD

*   **GitLab CI**
*   **GitHub Actions**

##  Project Structure

The project is divided into two main parts: `backend` and `frontend`.

```
.
├── backend/         # Spring Boot application
│   ├── build.gradle
│   ├── src/
│   │   └── main/
│   │       └── java/
│   │           └── com/example/backend/
│   │               ├── config/         # Security, Swagger, Web configurations
│   │               ├── controller/     # API endpoints
│   │               ├── dto/            # Data Transfer Objects
│   │               ├── exception/      # Global exception handling
│   │               ├── filter/         # JWT and logging filters
│   │               ├── interceptor/    # Request interceptors
│   │               ├── scheduled/      # Scheduled tasks
│   │               └── util/           # Utility classes (e.g., JwtUtil)
│   └── ...
├── frontend/        # Next.js application
│   ├── package.json
│   ├── src/
│   │   └── app/
│   │       ├── dashboard/
│   │       ├── login/
│   │       └── ...
│   └── ...
├── .github/         # GitHub Actions workflows
│   └── workflows/
│       ├── ci-pipeline.yml
│       └── deploy.yml
└── .gitlab-ci.yml   # GitLab CI configuration
```

##  Backend Features

The backend is a Spring Boot application with the following key features:

*   **RESTful API:** Exposes a set of RESTful endpoints for the frontend to consume.
*   **Security:** Secured using Spring Security and JWTs.
    *   `SecurityConfig.java`: Configures the security filter chain, password encoder, and public endpoints.
    *   `JwtAuthenticationFilter.java`: A filter that validates incoming JWTs.
    *   `JwtUtil.java`: A utility class for creating and validating JWTs.
*   **API Documentation:** Integrated with Swagger/OpenAPI for easy API exploration and testing.
    *   `SwaggerConfig.java`: Configures Swagger.
*   **Logging:**
    *   `RequestResponseLoggingFilter.java`: Logs incoming requests and outgoing responses.
    *   `LoggingInterceptor.java`: An interceptor for logging.
*   **Error Handling:**
    *   `GlobalExceptionHandler.java`: Handles exceptions globally and returns consistent error responses.
*   **Asynchronous Processing:**
    *   `ThreadConfig.java`: Configures a thread pool for asynchronous tasks.
*   **Scheduled Tasks:**
    *   `ScheduledTasks.java`: Contains examples of scheduled tasks.

##  Getting Started

### Prerequisites

*   Java 11 or higher
*   Gradle
*   Node.js and npm

### Running the Backend

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Build the project using Gradle:
    ```bash
    ./gradlew build
    ```
3.  Run the application:
    ```bash
    ./gradlew bootRun
    ```
The backend server will start on `http://localhost:8080`.

### Running the Frontend

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
The frontend will be available on `http://localhost:3000`.

##  CI/CD

This project is configured with CI/CD pipelines for both GitLab and GitHub.

*   **`.gitlab-ci.yml`**: Defines the GitLab CI pipeline. It can be configured to build, test, and deploy the backend and frontend applications.
*   **`.github/workflows/`**: Contains GitHub Actions workflows.
    *   `ci-pipeline.yml`: A workflow for continuous integration (building and testing).
    *   `deploy.yml`: A workflow for continuous deployment.

These pipelines are designed to automate the software development lifecycle, ensuring that every change is automatically tested and deployed.
