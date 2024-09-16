import React from "react";
import MyPageContainer from "./Components/MyPageContainer";
import styled from "styled-components";

// 제목(fix)
const Title = styled.h2`
  border-bottom: 1px solid #f5a623;
  width: 1100px;
  padding-bottom: 15px;
  display: inline-block;
`;

const FormContainer = styled.form`
  display: -webkit-inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1100px;
`;

// 레이블과 입력 필드를 나란히 배치할 컨테이너
const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

// 레이블 스타일
const Label = styled.label`
  font-size: 15px;
  font-weight: bold;
  margin-top: 2px;
  margin-right: 30px;
  text-align: right;
  width: 30%;
`;

// 인풋 필드 스타일
const Input = styled.input`
  width: 66%; // 레이블과 균형 맞추기
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 16px;
  background-color: #fff4e9;
`;
const AddressInput = styled.input`
  flex-grow: 1;
  width: 48%;
  background-color: #fff4e9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 16px;
  margin-right: 10px; // 버튼과의 간격을 조정
  cursor: not-allowed; // 커서 금지
`;
const DisabledInput = styled.input`
  width: 65%; // 레이블과 균형 맞추기
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 16px;
  background-color: #f0f0f0; // 회색 배경
  color: #999;
  cursor: not-allowed; // 커서를 금지로 변경
`;

const BirthdayInput = styled.input`
  width: 30%; // 더 넓게 설정하여 비율 맞추기
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 16px;
  margin-right: 2%; // 오른쪽 간격을 추가하여 성별 필드와 균형 맞추기
  background-color: #f0f0f0; // 회색 배경
  color: #999;
  cursor: not-allowed; // 커서를 금지로 변경
`;

const GenderInput = styled.input`
  width: 30%; // 생년월일과 균형 맞추기
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 16px;
  background-color: #f0f0f0; // 회색 배경
  color: #999;
  cursor: not-allowed; // 커서를 금지로 변경
`;

// 핸드폰 번호 입력 필드
const PhoneInput = styled.input`
  flex-grow: 1;
  width: 48%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 16px;
  margin-right: 10px; // 버튼과의 간격을 조정
  background-color: #f0f0f0; // 회색 배경
  color: #999;
  cursor: not-allowed; // 커서 금지
`;

// 변경 취소 버튼 컨테이너
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 800px; // 버튼도 컨테이너 크기 내에서 고정
  & > button {
    margin-right: 100px; /* 버튼 사이에 간격 추가 */
  }

  & > button:last-child {
    margin-right: 0; /* 마지막 버튼에는 margin-right 제거 */
  }
`;

// 본인인증 및 주소 검색 버튼
// 본인인증 버튼 스타일
const AuthButton = styled.button`
  flex-shrink: 0;
  background-color: #ff9630;
  color: #ffffff;
  border-radius: 20px;
  padding: 10px 15px;
  margin-left: 10px;
  font-size: 14px;
  border: none; // 테두리를 제거하여 회색 부분 제거
  &:hover {
    background-color: #e5831d;
  }
`;
// 버튼 스타일
const Button = styled.button`
  background-color: #ff9630;
  height: 30px;
  width: 85px;
  border: none;
  margin: 10px;
  color: white;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e5831d;
  }
`;

// 회원 탈퇴 버튼 컨테이너
const DeleteContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 1100px;
  border-top: 1px solid #f5a623;
`;

// 회원 탈퇴 버튼
const WithdrawButton = styled(Button)`
  margin-top: 30px;
  border-radius: 20px;
  background-color: #7d7d7d;
  width: 300px;
  height: 40px;
  font-size: 25px;

  &:hover {
    background-color: #e43a3a;
  }
`;

const DashBoard = ({ formData, handleChange, handleSubmit }) => {
  return (
    <>
      <Title>회원정보 수정</Title>
      <FormContainer onSubmit={handleSubmit}>
        {/* 아이디 */}
        <RowContainer>
          <Label>아이디</Label>
          <DisabledInput type="text" name="userId" value="hong1" disabled />
        </RowContainer>

        {/* 비밀번호 변경 */}
        <RowContainer>
          <Label>비밀번호 변경</Label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            value={formData.password}
            onChange={handleChange}
          />
        </RowContainer>

        {/* 비밀번호 변경 확인 */}
        <RowContainer>
          <Label>비밀번호 변경 확인</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </RowContainer>

        {/* 주소 변경 */}
        <RowContainer>
          <Label>주소</Label>
          <AddressInput
            type="text"
            name="address"
            placeholder="주소 입력"
            value={formData.address}
            onChange={handleChange}
            disabled
          />
          <AuthButton>주소 검색</AuthButton>
        </RowContainer>
        {/* 주소 변경 */}
        <RowContainer>
          <Label>상세 주소</Label>
          <Input
            type="text"
            name="address"
            placeholder="주소 입력"
            value={formData.address}
            onChange={handleChange}
          />
        </RowContainer>

        {/* 이름 */}
        <RowContainer>
          <Label>이름</Label>
          <DisabledInput type="text" name="name" value="홍길동" disabled />
        </RowContainer>

        {/* 생년월일 및 성별 */}
        <RowContainer>
          <Label>생년월일</Label>
          <BirthdayInput
            type="text"
            name="birthday"
            value="2000.11.21"
            disabled
          />
          <GenderInput type="text" name="gender" value="남성" disabled />
        </RowContainer>

        {/* 핸드폰 번호 변경 */}
        <RowContainer>
          <Label>핸드폰 번호</Label>
          <PhoneInput
            type="text"
            name="phone"
            placeholder="010-1234-5678"
            value={formData.phone}
            onChange={handleChange}
            disabled
          />
          <AuthButton>본인인증</AuthButton>
        </RowContainer>

        {/* 이메일 */}
        <RowContainer>
          <Label>이메일</Label>
          <Input
            type="email"
            name="email"
            placeholder="abc@domain.com"
            value={formData.email}
            onChange={handleChange}
          />
        </RowContainer>

        {/* MBTI */}
        <RowContainer>
          <Label>MBTI</Label>
          <Input
            type="text"
            name="mbti"
            placeholder="ENFP"
            value={formData.mbti}
            onChange={handleChange}
          />
        </RowContainer>

        {/* 관심사 */}
        <RowContainer>
          <Label>관심사</Label>
          <Input
            type="text"
            name="interest"
            placeholder="운동, 여행"
            value={formData.interest}
            onChange={handleChange}
          />
        </RowContainer>

        {/* 버튼 */}
        <ButtonContainer>
          <Button type="submit">변경</Button>
          <Button type="reset">취소</Button>
        </ButtonContainer>

        {/* 회원 탈퇴 버튼 */}
        <DeleteContainer>
          <WithdrawButton>회원 탈퇴</WithdrawButton>
        </DeleteContainer>
      </FormContainer>
    </>
  );
};

const EditProfile = () => {
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
    email: "",
    mbti: "",
    interest: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <MyPageContainer>
      <DashBoard
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </MyPageContainer>
  );
};

export default EditProfile;
