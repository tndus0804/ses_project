package com.sulomon.web.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // 로그인 없이 접근 가능 경로
    private static final String[] PUBLIC_URLS = {
        "/"                     // root
        , "/images/**"          // 이미지 경로
        , "/css/**"             // CSS 파일들
        , "/js/**"              // JavaScript 파일들
        , "/api/**"           // 연동 테스트 
    };
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 요청에 대한 권한 설정
            .authorizeHttpRequests(author -> author
                .requestMatchers(PUBLIC_URLS).permitAll()   // 모두 접근 허용
                .anyRequest().authenticated()               // 그 외의 모든 요청은 인증 필요
            )
            // HTTP Basic 인증을 사용하도록 설정
            .httpBasic(Customizer.withDefaults())           // HTTP Basic 인증 설정
            // 폼 로그인 설정
            .formLogin(formLogin -> formLogin
                    .loginPage("/member/loginForm")         // 로그인폼 페이지 경로
                    .usernameParameter("id")                // 폼의 ID 파라미터 이름
                    .passwordParameter("password")          // 폼의 비밀번호 파라미터 이름
                    .loginProcessingUrl("/member/login")    // 로그인폼 제출하여 처리할 경로
                    .defaultSuccessUrl("/", true)           // 로그인 성공 시 이동할 경로
                    .permitAll()                            // 로그인 페이지는 모두 접근 허용
            )
            // 로그아웃 설정
            .logout(logout -> logout
                    .logoutUrl("/member/logout")            // 로그아웃 처리 경로
                    .logoutSuccessUrl("/")                  // 로그아웃 성공 시 이동할 경로
            );

        http
            .cors(cors -> cors.disable())         // CORS (Cross-Origin Resource Sharing) 설정 비활성화
            .csrf(csrf -> csrf.disable());        // CSRF (Cross-Site Request Forgery) 보호 비활성화

        return http.build();
    }

    // 비밀번호 암호화를 위한 인코더를 빈으로 등록
    @Bean
    public BCryptPasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // React 앱이 실행되는 주소
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}