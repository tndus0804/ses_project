import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 전체 컨테이너 스타일
const Container = styled.div`
  padding: 20px;
  border: 1px solid #ff914d;
  border-radius: 10px;
  max-width: 1200px;
  margin: 0 auto;
`;

// 제목 스타일
const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
  text-align: left;
`;

// 입력 필드 스타일
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ff914d;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ff914d;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
`;

// 버튼 스타일
const Button = styled.button`
  background-color: #ff7f50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e76b39;
  }
`;

// 버튼 정렬 컨테이너 스타일
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; // 중앙 정렬
  margin-top: 20px; // 상단 여백 추가
`;

const NoticeWrite = ({ isAdmin }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAdmin) {
      alert("관리자만 공지사항을 작성할 수 있습니다.");
      return;
    }

    // 공지사항 데이터 생성
    const existingNotices = JSON.parse(localStorage.getItem("notices")) || [];
    const newId = existingNotices.length > 0 ? existingNotices.length + 1 : 1; // ID 설정

    const newNotice = {
      
      title,
      content,
      author: "관리자", // 작성자 설정
      
      
    };

    // 로컬 스토리지에 저장
    localStorage.setItem("notices", JSON.stringify([...existingNotices, newNotice]));

    alert("공지사항이 저장되었습니다!");
    navigate("/NoticeList"); // 공지사항 목록으로 이동
  };

  const submitHandler = async () => {
    console.log("안녕")

    
    const newNotice = {
      title: title,
      content: content,
      author: "관리자", // 작성자 설정
    };

    console.log(newNotice);
    console.log(JSON.stringify(newNotice));
    
    try {
      const response = await fetch('http://localhost:9996/web/api/NoticeWrite',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNotice), // 객체를 JSON 문자열로 변환
      });
      
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const result = await response.text(); // 텍스트 형식으로 응답 받기
      console.log(result);
      // setData(result);
    } catch (err) {
        // setError(err);
    } finally {
        // setLoading(false);
    }

  };

  return (
    <Container>
      <Title>공지사항 작성</Title>
      <form>
        <Input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          rows="10"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <ButtonContainer>
          <Button type="button" onClick={submitHandler}>저장하기</Button>
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default NoticeWrite;


