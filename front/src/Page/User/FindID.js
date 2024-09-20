// src/components/FindID.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
width: 400px;
margin: 100px auto;
padding: 20px;
border: 2px solid #FFB770;
border-radius: 10px;
text-align: center;
`;

const Title = styled.h2`
margin-bottom: 20px;
`;

const Input = styled.input`
width: 80%;
padding: 10px;
margin: 10px 0;
border-radius: 30px;
border: 1px solid #ddd;
`;

const Button = styled.button`
padding: 10px 20px;
background-color: #f90;
color: white;
border: none;
border-radius: 30px;
cursor: pointer;
width: 100px;
`;

const FindID = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    // 아이디 찾기 로직 처리
    console.log('이름:', name);
    console.log('이메일:', email);
    navigate('/FindPassword'); // 아이디 찾기가 완료되면 비밀번호 찾기 페이지로 이동
};

return (
    <Container>
    <Title>아이디 찾기</Title>
    <form onSubmit={handleSubmit}>
        <Input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">확인</Button>
    </form>
    </Container>
);
};

export default FindID;
