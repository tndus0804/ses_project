import React from "react";
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

const InputWrapper = styled.div`
  width: 400px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const InputBox = styled.div`
  font-family: 'Pretendard-Regular', serif;
  width: 100%;
  border: 0.3px solid #A69B9B; /* 네모 칸의 테두리 색 */
  border-radius: 30px;    /* 네모 칸의 모서리 둥글게 하기 */
  padding: 0 10px;        /* 입력창과 테두리 사이의 여백 */
  display: flex;
  align-items: center;    /* 입력창을 수직 중앙 정렬 */
  background-color: #ffffff; /* 네모 칸의 배경색 */
  color: #A69B9B;
  font-size: 15px;
`;

const Label = styled.span`
  padding-right: 15px;
  padding-left: 15px; /* 레이블과 입력창 사이의 간격 조정 */
  font-size: 15px;
  color: #A69B9B;
`;

const Input = styled.input`
  font-family: 'Pretendard-Regular', serif;
  width: 75%;
  height: 50px;
  font-size: 16px;
  border: none;             /* 입력창의 테두리 없음 */
  border-radius: 30px;     /* 입력창의 모서리 둥글게 하기 */
  background: transparent; /* 입력창 배경을 투명하게 */
  outline: none;           /* 입력창 클릭 시 기본 외곽선 제거 */
  margin-left: 60px;
  margin-left: auto;
`;

const LoginButton = styled.button`
  font-family: 'Pretendard-Regular', serif;
  width: 420px;
  height: 50px;
  background-color: #FFB770;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
  margin-left: 23px;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #A69B9B;
  line-height: 3;
`;

const Link = styled.a`
  font-family: 'Pretendard-Regular', serif;
  text-decoration: none;
  color: #999;
  font-size: 14px;
`;

const Separator = styled.span`
  font-family: 'Pretendard-Regular', serif;
  color: #A69B9B;
  margin: 0 10px;
`;

const SsoText = styled.p`
  font-family: 'Pretendard-Regular', serif;
  font-size: 14px;
  color: #A69B9B;
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
  return (
    <Container>
      <Logo src="/mainlogo.png" alt="Sulomon Logo" />
      <InputWrapper>
        <InputBox>
        <Label>아이디</Label>
          <span>|</span>
          <Input type="text" placeholder="" />
        </InputBox>
      </InputWrapper>
      <InputWrapper>
        <InputBox>
        <Label>비밀번호 |</Label>
          <Input type="password" placeholder="" />
        </InputBox>
      </InputWrapper>
      <LoginButton>로그인</LoginButton>
      <Links>
        <Link href="./FindID">아이디/비밀번호 찾기</Link>
        <Separator> | </Separator>
        <Link href="/signUp">회원가입</Link>
      </Links>
      <SsoText>소셜로그인으로 간편하게 가입하세요</SsoText>
      <SsoIcons>
        <SsoIcon src="/kakao.png" alt="Kakao" />
        <SsoIcon src="/naver.png" alt="Naver" />
        <SsoIcon src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
      </SsoIcons>
    </Container>
  );
}

export default Login;
