import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdminContainer from "./Components/AdminContainer";

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

// 검색창 스타일
const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  width: 300px;
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
  text-align: center;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fcfcfc;
  }
`;

const TableData = styled.td`
  padding: 12px;
  border-bottom: 1px dashed #ff914d;
  text-align: center;
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

// 삭제 버튼 스타일
const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #ff3333;
  }
`;

const AdminSurvey = () => {
  const initialSurveys = [
    { id: 1, title: "OO 만족도 조사", period: "2024-09-01 ~ 2024-10-01", status: "진행중" },
    { id: 2, title: "서비스 개선 설문", period: "2024-08-15 ~ 2024-09-15", status: "종료" },
    { id: 3, title: "신제품 피드백 조사", period: "2024-07-01 ~ 2024-08-01", status: "종료" },
    { id: 4, title: "사용자 만족도 조사", period: "2024-09-05 ~ 2024-09-25", status: "진행중" },
    { id: 59, title: "사용자 만족도 조사", period: "2024-09-05 ~ 2024-09-25", status: "진행중" },
    { id: 51, title: "사용자 만족도 조사", period: "2024-09-05 ~ 2024-09-25", status: "진행중" },
    { id: 58, title: "사용자 만족도 조사", period: "2024-09-05 ~ 2024-09-25", status: "진행중" },
  ];

  const [surveys, setSurveys] = useState(() => {
    const savedSurveys = localStorage.getItem("surveys");
    return savedSurveys ? JSON.parse(savedSurveys) : initialSurveys;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSurveys, setFilteredSurveys] = useState(surveys);

  useEffect(() => {
    localStorage.setItem("surveys", JSON.stringify(surveys));
    setFilteredSurveys(surveys); // 기본적으로 필터링된 설문 목록 업데이트
  }, [surveys]);

  const handleSearch = () => {
    setFilteredSurveys(
      surveys.filter(survey =>
        survey.title.includes(searchTerm) ||
        survey.id.toString() === searchTerm ||
        survey.period.includes(searchTerm)
      )
    );
  };

  const handleDelete = (id) => {
    const updatedSurveys = surveys.filter(survey => survey.id !== id);
    setSurveys(updatedSurveys);
    // 필터링된 목록도 업데이트
  };

  return (
    <AdminContainer>
      <Container>
        <Title>설문조사 관리</Title>

        {/* 검색창 */}
        <SearchContainer>
          <SearchInput 
            placeholder="설문 제목, 번호 또는 기간 검색" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchContainer>

        {/* 테이블 */}
        <Table>
          <thead>
            <tr>
              <TableHeader>번호</TableHeader>
              <TableHeader>설문 제목</TableHeader>
              <TableHeader>설문 기간</TableHeader>
              <TableHeader>설문 상태</TableHeader>
              <TableHeader>삭제</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredSurveys.map((survey) => (
              <TableRow key={survey.id}>
                <TableData>{survey.id}</TableData>
                <TableData>{survey.title}</TableData>
                <TableData>{survey.period}</TableData>
                <TableData>{survey.status}</TableData>
                <TableData>
                  <DeleteButton onClick={() => handleDelete(survey.id)}>삭제</DeleteButton>
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
      </Container>
    </AdminContainer>
  );
};

export default AdminSurvey;
