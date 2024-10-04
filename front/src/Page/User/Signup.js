import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 600px;
  margin: 50px auto;
  padding: 30px;
  border: 2px solid #f5a623;
  border-radius: 10px;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h2`
  color: #000000;
  text-align: center;
  margin-bottom: 40px;
  font-size: 26px;
  border-bottom: 2px solid #f5a623;
  line-height: 3;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 15px;
  color: #000000;
`;

const LabelText = styled.span`
  width: 100px;
  font-weight: bold;
  margin-left: 30px;
`;

const Input = styled.input`
  flex: 1;
  padding: 13px;
  border: none;
  border-radius: 45px;
  font-size: 15px;
  background-color: #fff4e9;
`;

const Select = styled.select`
  width: auto;
  max-width: 200px;
  padding: 13px;
  border: none;
  background-color: #fff4e9;
  border-radius: 45px;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 100%;
  max-width: 100px;
  background-color: #ff8c00;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 45px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #e07c00;
  }
`;

const Signup = () => {
  const [form, setForm] = useState({
    userId: "", // 사용자 아이디
    password: "", // 비밀번호
    confirmPassword: "", // 비밀번호 확인
    address: "", // 주소
    name: "", // 이름
    birthday: "", // 생년월일 (YYYY-MM-DD 형태로 입력)
    gender: "", // 성별 (MALE, FEMALE, OTHER)
    phoneNumber: "", // 전화번호
    email: "", // 이메일 주소 앞 부분
    emailDomain: "", // 이메일 주소 뒷 부분 (도메인)
    mbti: "", // MBTI
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const [error, setError] = useState("");

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (form.password !== form.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return; // 비밀번호가 일치하지 않으면 제출 중단
    }

    // email과 emailDomain을 결합하여 full email 만들기
    const fullEmail = `${form.email}@${form.emailDomain}`;

    // 백엔드로 전송할 signupData
    const signupData = {
      userId: form.userId,
      password: form.password,
      address: form.address,
      name: form.name,
      birthday: form.birthday,
      gender: form.gender,
      phoneNumber: form.phoneNumber,
      email: fullEmail, // email과 emailDomain 결합
      mbti: form.mbti,
    };

    console.log("폼 제출 데이터:", signupData);

    try {
      const response = await fetch("/web/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData), // 폼 데이터를 JSON 형식으로 변환하여 전송
      });

      if (response.ok) {
        console.log("회원가입 성공");
        // 성공 시 원하는 경로로 리디렉션 또는 알림 처리
      } else {
        console.error("회원가입 실패");
      }
    } catch (error) {
      console.error("서버 오류", error);
    }
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          <LabelText>아이디</LabelText>
          <Input
            type="text"
            name="userId"
            value={form.userId}
            onChange={handleChange}
            required
          />
        </Label>

        <Label>
          <LabelText>비밀번호</LabelText>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </Label>

        <Label>
          <LabelText>비밀번호 확인</LabelText>
          <Input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </Label>

        <Label>
          <LabelText>주소</LabelText>
          <Input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </Label>

        <Label>
          <LabelText>이름</LabelText>
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </Label>

        <Label>
          <LabelText>생년월일</LabelText>
          <Input
            type="date"
            name="birthday"
            value={form.birthday}
            onChange={handleChange}
          />
          <LabelText>성별</LabelText>
          <Select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">선택</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="other">기타</option>
          </Select>
        </Label>

        <Label>
          <LabelText>핸드폰번호</LabelText>
          <Input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="번호 입력"
          />
        </Label>

        <Label>
          <LabelText>이메일</LabelText>
          <Input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일 주소 입력"
          />
          <span>@</span>
          <Select
            name="emailDomain"
            value={form.emailDomain}
            onChange={handleChange}
          >
            <option value="">선택</option>
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
            <option value="daum.net">daum.net</option>
          </Select>
        </Label>

        <Label>
          <LabelText>MBTI</LabelText>
          <Select name="mbti" value={form.mbti} onChange={handleChange}>
            <option value="">선택</option>
            <option value="ISTJ">ISTJ</option>
            <option value="ISFJ">ISFJ</option>
            <option value="INFJ">INFJ</option>
            <option value="INTJ">INTJ</option>
            <option value="ISTP">ISTP</option>
            <option value="ISFP">ISFP</option>
            <option value="INFP">INFP</option>
            <option value="INTP">INTP</option>
            <option value="ESTP">ESTP</option>
            <option value="ESFP">ESFP</option>
            <option value="ENFP">ENFP</option>
            <option value="ENTP">ENTP</option>
            <option value="ESTJ">ESTJ</option>
            <option value="ESFJ">ESFJ</option>
            <option value="ENFJ">ENFJ</option>
            <option value="ENTJ">ENTJ</option>
          </Select>
        </Label>

        <ButtonContainer>
          <Button type="submit">가입</Button>
          <Button type="button">취소</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default Signup;
