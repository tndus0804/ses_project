import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Logo = styled.img`
  width: 400px;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  width: 400px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 필드 간의 간격을 20px로 설정 */
`;

const InputBox = styled.div`
  font-family: "Pretendard-Regular", serif;
  width: 100%;
  border: 0.3px solid #a69b9b; /* 네모 칸의 테두리 색 */
  border-radius: 30px; /* 네모 칸의 모서리 둥글게 하기 */
  padding: 0 10px; /* 입력창과 테두리 사이의 여백 */
  display: flex;
  align-items: center; /* 입력창을 수직 중앙 정렬 */
  background-color: #ffffff; /* 네모 칸의 배경색 */
  color: #a69b9b;
  font-size: 15px;
`;

const Label = styled.span`
  padding-right: 15px;
  padding-left: 15px; /* 레이블과 입력창 사이의 간격 조정 */
  font-size: 15px;
  color: #a69b9b;
`;

const Input = styled.input`
  font-family: "Pretendard-Regular", serif;
  width: 75%;
  height: 50px;
  font-size: 16px;
  border: none; /* 입력창의 테두리 없음 */
  border-radius: 30px; /* 입력창의 모서리 둥글게 하기 */
  background: transparent; /* 입력창 배경을 투명하게 */
  outline: none; /* 입력창 클릭 시 기본 외곽선 제거 */
  margin-left: 60px;
  margin-left: auto;
`;

const LoginButton = styled.button`
  font-family: "Pretendard-Regular", serif;
  width: 420px;
  height: 50px;
  background-color: #ffb770;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #a69b9b;
  line-height: 3;
`;

const Link = styled.a`
  font-family: "Pretendard-Regular", serif;
  text-decoration: none;
  color: #999;
  font-size: 14px;
`;

const Separator = styled.span`
  font-family: "Pretendard-Regular", serif;
  color: #a69b9b;
  margin: 0 10px;
`;

const SsoText = styled.p`
  font-family: "Pretendard-Regular", serif;
  font-size: 14px;
  color: #a69b9b;
  margin-bottom: 10px;
`;

const SsoIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  padding-top: 30px;
`;

const SsoIcon = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
`;

function Login() {
  const [userId, setUserId] = useState(""); // 아이디 상태 관리
  const [password, setPassword] = useState(""); // 비밀번호 상태 관리

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      userId,
      password,
    };

    try {
      const response = await fetch("/web/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json(); // JWT 토큰을 포함한 응답 데이터
        const token = data.token; // 서버에서 반환한 JWT 토큰

        // JWT를 로컬 스토리지에 저장
        localStorage.setItem("token", token);

        console.log("로그인 성공, JWT:", token);

        // 로그인 성공 후 리디렉션
        window.location.href = "/";
      } else {
        console.error("로그인 실패");
        // 로그인 실패 시 추가 처리 (예: 에러 메시지 표시)
      }
    } catch (error) {
      console.error("서버 오류 발생", error);
    }
  };

  return (
    <Container>
      <Logo src="/mainlogo.png" alt="Sulomon Logo" />

      {/* 아이디 입력 */}
      <LoginForm>
        <InputBox>
          <Label>아이디</Label>
          <span>|</span>
          <Input
            type="text"
            value={userId} // 상태와 연결
            onChange={(e) => {
              setUserId(e.target.value); // 입력 변경 처리
            }}
            placeholder="아이디 입력"
          />
        </InputBox>

        {/* 비밀번호 입력 */}
        <InputBox>
          <Label>비밀번호</Label>
          <span>|</span>
          <Input
            type="password"
            value={password} // 상태와 연결
            onChange={(e) => setPassword(e.target.value)} // 입력 변경 처리
            placeholder="비밀번호 입력"
          />
        </InputBox>

        {/* 로그인 버튼 */}
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
      </LoginForm>

      <Links>
        <Link href="./FindID">아이디/비밀번호 찾기</Link>
        <Separator> | </Separator>
        <Link href="/signUp">회원가입</Link>
      </Links>

      <SsoText>소셜로그인으로 간편하게 가입하세요</SsoText>
      <SsoIcons>
        <SsoIcon src="/kakao.png" alt="Kakao" />
        <SsoIcon src="/naver.png" alt="Naver" />
        <SsoIcon
          src="https://img.icons8.com/color/48/000000/google-logo.png"
          alt="Google"
        />
      </SsoIcons>
    </Container>
  );
}

export default Login;
