[Java Style Guide](https://google.github.io/styleguide/javaguide.html#s1-introduction)

---

# 백엔드 모듈

이 백엔드 모듈은 MySQL 데이터베이스와 Thymeleaf 템플릿 엔진을 사용하여 웹 애플리케이션을 제공합니다.

## 목차

1. [프로젝트 구조](#프로젝트-구조)
2. [기술 스택](#기술-스택)
3. [코딩 규칙](#코딩-규칙)
4. [데이터베이스 설정](#데이터베이스-설정)

## 프로젝트 구조

백엔드 모듈의 디렉토리 구조를 설명합니다:

```plaintext
📦backend
┣ 📂src
┃ ┣ 📂main
┃ ┃ ┣ 📂java
┃ ┃ ┃ ┗ 📂com
┃ ┃ ┃ ┃ ┗ 📂sulomon
┃ ┃ ┃ ┃ ┃ ┗ 📂dsa
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ TestController.java
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂security
┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ SecurityConfig.java
┃ ┃ ┃ ┃ ┃ ┃ ┗ SulomonApplication.java
┃ ┃ ┗ 📂resources
┃ ┃ ┃ ┗ application.properties
┃ ┗ 📂test
┃ ┃ ┗ 📂java
┃ ┃ ┃ ┗ 📂com
┃ ┃ ┃ ┃ ┗ 📂sulomon
┃ ┃ ┃ ┃ ┃ ┗ 📂dsa
┃ ┃ ┃ ┃ ┃ ┃ ┗SulomonApplicationTests.java
┣ .gitignore
┣ build.gradle
┣ 📜gradlew
┃ ┣ gradlew.bat
┃ ┗ settings.gradle
┣ .gitignore
┗ README.md
```

각 폴더의 역할과 그 안에 포함된 파일들을 간략히 설명합니다.

## 기술 스택

백엔드 모듈에서 사용된 주요 기술 스택을 나열합니다:

- **Spring Boot**: 애플리케이션 프레임워크
- **MySQL**: 관계형 데이터베이스
- **Spring Data JPA**: 데이터베이스 접근 계층
- **Gradle**: 빌드 도구

## 코딩 규칙

백엔드 코드 작성 시 준수해야 할 규칙들을 설명합니다:

- [**구글 스타일 가이드**](https://google.github.io/styleguide/javaguide.html#s1-introduction): 자바 코딩 스타일로 구글 자바 스타일 가이드를 따릅니다.
- [sql 스타일 가이드](https://www.sqlstyle.guide/ko/): SQL 코딩 스타일로 SQL 스타일 가이드 by Simon Holywell를 따릅니다.

## 데이터베이스 테이블

백엔드 애플리케이션에서 사용하는 MySQL 데이터베이스 테이블 목록입니다.

1. **유저 테이븦**

- 유저 정보 테이블

2. **설문조사 테이블**

- 설문조사 테이블
- 설문조사 질문 테이블
- 설문조사 응답 테이블

3. **게시판 관련 테이블**

- 게시판 테이블
- 관심사 테이블
- 유저와 관심사 간의 다대다 관계 테이블
- 게시글과 관심사 간의 다대다 관계 테이블

4. **댓글 테이블**
5. **결제 및 기프티콘 관련 테이블**

- 결제 테이블
- 기프티콘 테이블

6. **공지사항 테이블**
