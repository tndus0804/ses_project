import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  margin-top: 20px;
  margin-bottom: 5px;
  color: #333;
  text-align: left;
  margin-left: 30px;
`;

// 헤더 컨테이너 스타일
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between; // 양 끝 정렬
  align-items: center; // 세로 중앙 정렬
  margin-bottom: 20px;
`;

// 검색창 스타일
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 200px;
  padding: 8px;
  border: 1px solid #ff914d;
  border-radius: 4px;
  outline: none;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  background-color: #ff914d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

// 테이블 스타일
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
`;

const TableHeader = styled.th`
  padding: 12px;
  border-bottom: 2px solid #ff914d;
  background-color: #f8f8f8;
  text-align: center; // 가운데 정렬
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fcfcfc;
  }
`;

const TableData = styled.td`
  padding: 12px;
  border-bottom: 1px dashed #ff914d;
  text-align: center; // 가운데 정렬
`;

// 버튼 스타일
const Button = styled.button`
  background-color: #ff7f50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #e76b39;
  }
`;

// 페이지 네비게이션 스타일
const Pagination = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const PageNumber = styled.span`
  margin: 0 5px;
  cursor: pointer;
  color: ${props => (props.active ? "#ff914d" : "#333")};
  font-weight: ${props => (props.active ? "bold" : "normal")};
  &:hover {
    color: #ff914d;
  }
`;

// 버튼 정렬 컨테이너 스타일
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; // 오른쪽 정렬
`;

const NoticeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('http://localhost:9996/web/api/NoticeList'); // API 호출
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // JSON으로 변환
        setNotices(data);
        setFilteredNotices(data);
        console.log(data); 
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  const handleSearch = () => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const results = notices.filter(notice =>
      notice.id.toString().includes(lowercasedTerm) ||
      notice.title.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredNotices(results);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:9996/web/api/Notices/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete notice');
      }
      const updatedNotices = notices.filter(notice => notice.id !== id);
      setNotices(updatedNotices);
      setFilteredNotices(updatedNotices);
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  return (
    <Container>
      {/* 헤더 컨테이너 */}
      <HeaderContainer>
        <Title>공지사항</Title>
        {/* 검색창 */}
        <SearchContainer>
          <SearchInput 
            placeholder="번호, 제목 검색" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchContainer>
      </HeaderContainer>

      {/* 공지사항 목록 테이블 */}
      <Table>
        <thead>
          <tr >
            <TableHeader>번호</TableHeader>
            <TableHeader>제목</TableHeader>
            <TableHeader>작성자</TableHeader>
            <TableHeader>날짜</TableHeader>
            <TableHeader>조회수</TableHeader>
            <TableHeader>삭제</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredNotices.map(notice => (
            <TableRow key={notice.id}>
              <TableData>{notice.noticeId}</TableData>
              <TableData>{notice.title}</TableData>
              <TableData>{notice.author || "관리자"}</TableData>
              <TableData>{notice.date}</TableData>
              <TableData>{notice.views || 0}</TableData>
              <TableData>
                <Button onClick={() => handleDelete(notice.id)}>삭제</Button>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* 페이지 네비게이션 */}
      <Pagination>
        <PageNumber active>1</PageNumber>
        <PageNumber>2</PageNumber>
        <PageNumber>3</PageNumber>
        <PageNumber>4</PageNumber>
        <PageNumber>5</PageNumber>
      </Pagination>

      {/* 버튼 정렬 컨테이너 */}
      <ButtonContainer>
        <Link to="/NoticeWrite">
          <Button>글쓰기</Button>
        </Link>
      </ButtonContainer>
    </Container>
  );
};

export default NoticeList;
