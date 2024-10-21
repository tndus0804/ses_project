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

const MailButton = styled.button`
  width: 100%;
  max-width: 100px;
  background-color: #ff8c00;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 45px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 20px;
  &:hover {
    background-color: #e07c00;
  }
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
    userId: "",
    password: "",
    confirmPassword: "",
    address: "",
    name: "",
    birthday: "",
    gender: "",
    phoneNumber: "",
    email: "",
    emailDomain: "",
    mbti: "",
    verificationCode: "", // 추가된 필드
  });

  const [error, setError] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(false); // 인증 상태

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // 이메일 인증 요청 함수
  const handleEmailVerification = async () => {
    const fullEmail = `${form.email}@${form.emailDomain}`;
    try {
      const response = await fetch("/web/send-verification-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: fullEmail }),
      });

      if (response.ok) {
        console.log("인증 코드가 전송되었습니다.");
      } else {
        console.error("인증 코드 전송 실패");
      }
    } catch (error) {
      console.error("서버 오류", error);
    }
  };

  // 인증 코드 확인 함수
  const handleCodeVerification = async () => {
    const fullEmail = `${form.email}@${form.emailDomain}`;
    try {
      const response = await fetch("/web/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: fullEmail,
          verificationCode: form.verificationCode,
        }),
      });

      if (response.ok) {
        console.log("이메일 인증 성공");
        setVerificationStatus(true); // 인증 성공
      } else {
        console.error("이메일 인증 실패");
        setVerificationStatus(false); // 인증 실패
      }
    } catch (error) {
      console.error("서버 오류", error);
      setVerificationStatus(false); // 인증 실패
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!verificationStatus) {
      setError("이메일 인증을 완료해주세요.");
      return;
    }

    const fullEmail = `${form.email}@${form.emailDomain}`;
    const signupData = {
      userId: form.userId,
      password: form.password,
      name: form.name,
      birthday: form.birthday,
      gender: form.gender,
      phoneNumber: form.phoneNumber,
      email: fullEmail,
      verificationCode: form.verificationCode,
    };

    console.log("폼 제출 데이터:", signupData);

    try {
      const response = await fetch("/web/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        console.log("회원가입 성공");
        setForm({
          userId: "",
          password: "",
          confirmPassword: "",
          name: "",
          birthday: "",
          gender: "",
          phoneNumber: "",
          email: "",
          emailDomain: "",
          verificationCode: "", // 폼 초기화
        });
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
          <MailButton type="button" onClick={handleEmailVerification}>
            인증
          </MailButton>
        </Label>

        {/* 이메일 인증 코드 입력 */}
        <Label>
          <LabelText>인증 코드</LabelText>
          <Input
            type="text"
            name="verificationCode"
            value={form.verificationCode}
            onChange={handleChange}
            placeholder="인증 코드 입력"
          />
          <MailButton type="button" onClick={handleCodeVerification}>
            확인
          </MailButton>
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
