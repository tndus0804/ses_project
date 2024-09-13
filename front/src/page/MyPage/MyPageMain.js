import React from "react";
import MyPageContainer from "./Components/MyPageContainer";
import styled from "styled-components";

// 비밀번호 인증 섹션 스타일링
const PasswordSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  border: 1px solid #f5a623;
  border-radius: 5px;
  padding: 10px;
  width: 300px;
  margin-top: 20px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #f5a623;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #e59400;
  }
`;

const DashBoard = () => {
  return (
    <PasswordSection>
      <h2>비밀번호 인증</h2>
      <p>*본인 확인을 위해 비밀번호를 인증하세요</p>
      <Input type="password" placeholder="비밀번호 입력" />
      <Button>확인</Button>
    </PasswordSection>
  );
};

const MyPageMain = () => {
  return (
    <MyPageContainer>
      <DashBoard />
    </MyPageContainer>
  );
};

export default MyPageMain;
