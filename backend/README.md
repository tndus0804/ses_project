[Java Style Guide](https://google.github.io/styleguide/javaguide.html#s1-introduction)

---

# 백엔드 모듈

이 백엔드 모듈은 MySQL 데이터베이스와 Thymeleaf 템플릿 엔진을 사용하여 웹 애플리케이션을 제공합니다.

## 목차

1. [프로젝트 구조](#프로젝트-구조)
2. [기술 스택](#기술-스택)
3. [코딩 규칙](#코딩-규칙)
4. [환경 변수 설정](#환경-변수-설정)
5. [데이터베이스 설정](#데이터베이스-설정)
6. [API 문서](#api-문서)
7. [테스트](#테스트)
8. [배포](#배포)

## 프로젝트 구조

백엔드 모듈의 디렉토리 구조를 설명합니다:

```plaintext
src/
├── main/
│   ├── java/
│   │   └── com/example/yourproject/
│   │       ├── controllers/     # Spring MVC 컨트롤러
│   │       ├── models/          # 엔티티 및 데이터 모델
│   │       ├── repositories/    # Spring Data JPA 리포지토리
│   │       ├── services/        # 비즈니스 로직 구현
│   │       └── Application.java # 스프링 부트 메인 클래스
│   ├── resources/
│   │   ├── templates/           # Thymeleaf 템플릿 파일
│   │   ├── static/              # 정적 자원 (CSS, JS, 이미지)
│   │   ├── application.properties # Spring Boot 설정 파일
│   │   └── schema.sql           # 초기 데이터베이스 스키마
└── test/                        # 테스트 코드
```

각 폴더의 역할과 그 안에 포함된 파일들을 간략히 설명합니다.

## 기술 스택

백엔드 모듈에서 사용된 주요 기술 스택을 나열합니다:

- **Spring Boot**: 애플리케이션 프레임워크
- **Thymeleaf**: 템플릿 엔진
- **MySQL**: 관계형 데이터베이스
- **Spring Data JPA**: 데이터베이스 접근 계층
- **Maven 또는 Gradle**: 빌드 도구

## 코딩 규칙

백엔드 코드 작성 시 준수해야 할 규칙들을 설명합니다:

- [**구글 스타일 가이드**](https://google.github.io/styleguide/javaguide.html#s1-introduction): 자바 코딩 스타일로 구글 자바 스타일 가이드를 따릅니다.
- [sql 스타일 가이드](https://www.sqlstyle.guide/ko/): SQL 코딩 스타일로 SQL 스타일 가이드 by Simon Holywell를 따릅니다.

## 환경 변수 설정

백엔드 프로젝트에서 필요한 환경 변수를 설정하는 방법을 설명합니다:

1. `application.properties` 파일에서 다음 항목들을 설정합니다:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/yourdatabase
   spring.datasource.username=yourusername
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   spring.thymeleaf.cache=false
   ```

2. 위와 같은 환경 변수를 설정하여 서버가 올바르게 동작하도록 합니다.

## 데이터베이스 설정

백엔드 애플리케이션에서 사용하는 MySQL 데이터베이스 설정 방법을 설명합니다:

1. **MySQL 데이터베이스 생성**

   ```sql
   CREATE DATABASE yourdatabase;
   ```

2. **사용자 생성 및 권한 부여**

   ```sql
   CREATE USER 'yourusername'@'localhost' IDENTIFIED BY 'yourpassword';
   GRANT ALL PRIVILEGES ON yourdatabase.* TO 'yourusername'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **데이터베이스 초기화**
   - `schema.sql` 또는 `data.sql` 파일을 통해 초기 스키마와 데이터를 설정합니다.

## API 문서

백엔드 애플리케이션에서 제공하는 API 엔드포인트를 설명합니다. 여기서는 Thymeleaf를 사용하여 서버 렌더링된 페이지를 제공할 수 있으며, API 엔드포인트도 필요에 따라 제공할 수 있습니다.

1. **사용자 관리 API**

   - `GET /users`: 모든 사용자 목록을 반환합니다.
   - `POST /users`: 새로운 사용자를 등록합니다.

2. **게시물 관리 API**
   - `GET /posts`: 모든 게시물 목록을 반환합니다.
   - `POST /posts`: 새로운 게시물을 작성합니다.
   - `GET /posts/{id}`: 특정 게시물을 반환합니다.

추가적으로, API 사용 방법을 설명하는 섹션을 포함할 수 있습니다.

## 테스트

백엔드 모듈의 테스트 실행 방법을 설명합니다:

1. **테스트 실행**
   ```bash
   ./mvnw test
   ```
   또는 Gradle을 사용하는 경우:
   ```bash
   ./gradlew test
   ```

## 배포

Docker를 사용하여 컨테이너화된 백엔드를 배포할 경우:

```bash
docker build -t your-image-name .
docker run -p 8080:8080 your-image-name
```
