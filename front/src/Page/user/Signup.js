import React, { useState } from 'react'; // React 라이브러리와 useState 훅을 불러옵니다.
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 훅을 불러옵니다.
import styled from 'styled-components'; // 스타일링을 위한 styled-components 라이브러리를 불러옵니다.

// 컨테이너 스타일 정의
const Container = styled.div`
  width: 600px; // 너비를 600px로 설정
  margin: 50px auto; // 위와 아래 여백을 50px로, 좌우 중앙 정렬
  padding: 30px; // 안쪽 여백을 30px로 설정
  border: 2px solid #f5a623; // 테두리 색상 및 두께 설정
  border-radius: 10px; // 모서리 둥글기 설정
  font-family: 'Arial', sans-serif; // 폰트 설정
`;

// 제목 스타일 정의
const Title = styled.h2`
  color: #000000; // 제목 색상 설정
  text-align: center; // 제목을 중앙 정렬
  margin-bottom: 40px; // 아래 여백을 40px로 설정
  font-size: 26px; // 폰트 크기 설정
  border-bottom: 2px solid #f5a623; // 제목 아래에 2px 두께의 테두리 추가
  line-height: 3; // 줄 높이 설정
`;

// 폼 스타일 정의
const Form = styled.form`
  display: flex; // 플렉스 박스 사용
  flex-direction: column; // 세로 방향으로 아이템 배치
`;

// 라벨 스타일 정의
const Label = styled.label`
  display: flex; // 플렉스 박스 사용
  align-items: center; // 아이템을 수직 중앙 정렬
  margin-bottom: 15px; // 아래 여백을 15px로 설정
  font-size: 15px; // 폰트 크기 설정
  color: #000000; // 텍스트 색상 설정
`;

// 라벨 텍스트 스타일 정의
const LabelText = styled.span`
  width: 100px; // 너비를 100px로 설정
  font-weight: bold; // 텍스트를 굵게 설정
  margin-left: 30px; // 왼쪽 여백을 10px로 설정
`;

// 입력 필드 스타일 정의
const Input = styled.input`
  flex: 1; // 남은 공간을 모두 차지하도록 설정
  padding: 13px; // 안쪽 여백을 10px로 설정
  border: none; // 테두리 제거
  border-radius: 45px; // 모서리 둥글기 설정
  font-size: 15px; // 폰트 크기 설정
  background-color: #FFF4E9; // 배경 색상 설정
`;

// 선택 상자 스타일 정의
const Select = styled.select`
  width: auto; // 너비를 자동으로 설정
  max-width: 200px; // 최대 너비를 200px로 설정
  padding: 13px; // 안쪽 여백을 10px로 설정
  border: none; // 테두리 제거
  background-color: #FFF4E9; // 배경 색상 설정
  border-radius: 45px; // 모서리 둥글기 설정
  font-size: 14px; // 폰트 크기 설정
`;

// 작은 버튼 스타일 정의
const SmallButton = styled.button`
  background-color: #ff8c00; // 배경 색상 설정
  color: white; // 텍스트 색상 설정
  padding: 11px 12px; // 안쪽 여백 설정
  border: none; // 테두리 제거
  font-size: 12px; // 폰트 크기 설정
  font-weight: bold;
  cursor: pointer; // 마우스 포인터를 손 모양으로 변경
  border-radius: 45px; // 모서리 둥글기 설정
  margin-left: 10px; // 왼쪽 여백을 10px로 설정

  &:hover {
    background-color: #e07c00; // 마우스 오버 시 배경 색상 변경
  }
`;

// 버튼 컨테이너 스타일 정의
const ButtonContainer = styled.div`
  display: flex; // 플렉스 박스 사용
  justify-content: center; // 가로 방향으로 중앙 정렬
  gap: 30px; // 버튼 사이에 30px 간격 설정
  margin-top: 20px; // 위쪽 여백을 20px로 설정
`;

// 주요 버튼 스타일 정의
const Button = styled.button`
  width: 100%; // 너비를 100%로 설정
  max-width: 100px; // 최대 너비를 100px로 설정
  background-color: ${props => props.cancel ? '#e0e0e0' : '#ff8c00'}; // 배경 색상 설정 (취소 버튼과 다른 색상)
  color: ${props => props.cancel ? 'black' : 'white'}; // 텍스트 색상 설정 (취소 버튼과 다른 색상)
  padding: 12px; // 안쪽 여백 설정
  border: none; // 테두리 제거
  border-radius: 45px; // 모서리 둥글기 설정
  font-size: 14px; // 폰트 크기 설정
  cursor: pointer; // 마우스 포인터를 손 모양으로 변경

  &:hover {
    background-color: ${props => props.cancel ? '#ccc' : '#e07c00'}; // 마우스 오버 시 배경 색상 변경
  }
`;

// 이메일 도메인 선택 상자 스타일 정의
const EmailDomainSelect = styled(Select)`
  width: auto; // 너비를 자동으로 설정
  max-width: 200px; // 최대 너비를 200px로 설정
  margin-left: 10px; // 왼쪽 여백을 10px로 설정
  margin-RIGHT: 0px;
`;

// MBTI 선택 상자 스타일 정의
const MbtiSelect = styled(Select)`
  flex: 1;

`;

// 전화번호 접두사 선택 상자 스타일 정의
const PhonePrefixSelect = styled(Select)`
  width: 100px; // 너비를 100px로 설정
  margin-right: 20px; // 오른쪽 여백을 설정
`;

// 전화번호 접두사 목록
const phonePrefixes = [
  '010', '011'
];

// 이메일 도메인 목록
const emailDomains = [
  'naver.com',
  'gmail.com',
  'daum.net'
];

// MBTI 유형 목록
const mbtiTypes = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

// 회원가입 컴포넌트 정의
function Signup() {
  // 폼 데이터 상태 관리
  const [form, setForm] = useState({
    id: '', // 아이디
    password: '', // 비밀번호
    confirmPassword: '', // 비밀번호 확인
    address: '', // 주소
    name: '', // 이름
    birthDate: '', // 생년월일
    gender: '', // 성별
    phonePrefix: '', // 전화번호 접두사
    phoneNumber: '', // 전화번호
    email: '', // 이메일
    emailDomain: '', // 이메일 도메인
    mbti: '', // MBTI
    interests: '' // 관심사
  });

  // 에러 상태 관리
  const [errors, setErrors] = useState({});
  // 아이디 중복 확인 상태 관리
  const [isIdAvailable, setIsIdAvailable] = useState(true);

  // 페이지 이동 훅
  const navigate = useNavigate();

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  // 이메일 도메인 변경 핸들러
  const handleEmailDomainChange = (e) => {
    const domain = e.target.value;
    setForm(prevForm => ({
      ...prevForm,
      emailDomain: domain,
      email: prevForm.email.split('@')[0] + '@' + domain // 이메일 도메인 업데이트
    }));
  };

  // 전화번호 접두사 변경 핸들러
  const handlePhonePrefixChange = (e) => {
    const prefix = e.target.value;
    setForm(prevForm => ({
      ...prevForm,
      phonePrefix: prefix
    }));
  };

  // 전화번호 입력값 변경 핸들러
  const handlePhoneNumberChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    // 포맷 적용: XXXX-XXXX
    if (value.length > 8) {
      value = value.slice(0, 4) + '-' + value.slice(4, 8);
    } else if (value.length > 4) {
      value = value.slice(0, 4) + '-' + value.slice(4, 8);
    }
    setForm(prevForm => ({
      ...prevForm,
      phoneNumber: value
    }));
  };

  // 폼 데이터 유효성 검사
  const validate = () => {
    const tempErrors = {};
    if (form.password !== form.confirmPassword) tempErrors.password = "비밀번호가 일치하지 않습니다."; // 비밀번호 확인 오류
    if (!form.email.includes('@')) tempErrors.email = "유효한 이메일 주소를 입력하세요."; // 이메일 오류
    setErrors(tempErrors); // 에러 상태 업데이트
    return Object.keys(tempErrors).length === 0; // 에러가 없으면 true 반환
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 제출 동작 방지
    if (validate()) { // 유효성 검사 후
      console.log(form); // 폼 데이터 출력
    }
  };

  // 아이디 중복 확인 핸들러
  const handleIdCheck = () => {
    console.log('아이디 중복 확인');
    setIsIdAvailable(false); // 중복 확인 후 상태 업데이트
  };

  // 전화번호 인증번호 발송 핸들러
  const handlePhoneVerify = () => {
    console.log('핸드폰 인증번호 발송');
  };

  // 취소 버튼 핸들러
  const handleCancel = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          <LabelText>아이디</LabelText>
          <Input type="text" name="id" value={form.id} onChange={handleChange} required />
          <SmallButton type="button" onClick={handleIdCheck}>중복확인</SmallButton>
          {!isIdAvailable && <span style={{ color: 'red' }}>아이디가 이미 사용 중입니다.</span>}
        </Label>

        <Label>
          <LabelText>비밀번호</LabelText>
          <Input type="password" name="password" value={form.password} onChange={handleChange} required />
        </Label>

        <Label>
          <LabelText>비밀번호 확인</LabelText>
          <Input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </Label>

        <Label>
          <LabelText>주소</LabelText>
          <Input type="text" name="address" value={form.address} onChange={handleChange} />
        </Label>

        <Label>
          <LabelText>이름</LabelText>
          <Input type="text" name="name" value={form.name} onChange={handleChange} />
        </Label>

        <Label>
          <LabelText>생년월일</LabelText>
          <Input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} />
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
          <PhonePrefixSelect
            name="phonePrefix"
            value={form.phonePrefix}
            onChange={handlePhonePrefixChange}
          >
            <option value="">선택</option>
            {phonePrefixes.map(prefix => (
              <option key={prefix} value={prefix}>{prefix}</option>
            ))}
          </PhonePrefixSelect>
          <Input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="번호 입력"
          />
          <SmallButton type="button" onClick={handlePhoneVerify}>인증번호</SmallButton>
        </Label>

        <Label>
          <LabelText>이메일</LabelText>
          <Input
            type="text"
            name="email"
            value={form.email.split('@')[0]}
            onChange={handleChange}
            placeholder="이메일 주소 입력"
          />
          <span>@</span>
          <EmailDomainSelect
            name="emailDomain"
            value={form.emailDomain}
            onChange={handleEmailDomainChange}
          >
            <option value="">선택</option>
            {emailDomains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </EmailDomainSelect>
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </Label>

        <Label>
          <LabelText>MBTI</LabelText>
          <MbtiSelect name="mbti" value={form.mbti} onChange={handleChange}>
            <option value="">선택</option>
            {mbtiTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </MbtiSelect>
        </Label>

        <Label>
          <LabelText>관심사</LabelText>
          <Input type="text" name="interests" value={form.interests} onChange={handleChange} />
        </Label>

        <ButtonContainer>
          <Button type="submit">가입</Button>
          <Button type="button" cancel onClick={handleCancel}>취소</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

export default Signup;
