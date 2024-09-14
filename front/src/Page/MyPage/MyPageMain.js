import React from "react";
import MyPageContainer from "./Components/MyPageContainer";
import styled from "styled-components";

// 전체 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

// 상단 텍스트
const Text = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-weight: lighter;
  position: relative;
  padding: 10px;
`;

// 별표 표시 텍스트
const StarText = styled.span`
  font-size: 30px;
  color: #ff9630;
  margin-right: 5px;
`;

// 전체 레이아웃을 담는 컨테이너
const FormContainer = styled.div`
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  padding: 20px;
  width: 80%;
  margin: 0 auto;
  background-color: white;
`;

// 왼쪽의 비밀번호 인증 텍스트
const Label = styled.label`
  font-size: 18px;
  margin-right: 30px;
`;

// 비밀번호 입력 필드
const Input = styled.input`
  border: 2px solid #f5a623;
  border-radius: 15px;
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
  width: 400px;
`;

// 확인 버튼
const Button = styled.button`
  background-color: #f5a623;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  margin-top: 10px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #e59400;
  }
`;

const DashBoard = () => {
  return (
    <Container>
      <Text>
        <StarText>*</StarText> 본인 확인을 위해 비밀번호를 인증하세요
      </Text>
      <FormContainer>
        <div>
          <Label>비밀번호 인증</Label>
          <Input type="password" placeholder="비밀번호 입력" />
        </div>
        <div>
          <Button>확인</Button>
        </div>
      </FormContainer>
    </Container>
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
