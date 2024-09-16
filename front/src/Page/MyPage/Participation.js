import React from "react";
import MyPageContainer from "./Components/MyPageContainer";
import styled from "styled-components";

// 제목(fix)
const Title = styled.h2`
  width: 1100px;
  // padding-bottom: 15px;
  display: -webkit-inline-box;
  font-weight: lighter;
`;
// 테이블 스타일
const Table = styled.table`
  border-top: 2px solid #f5a623;
  width: 1100px;
  border-collapse: collapse;
  margin-bottom: 20px;
  display: inline-table;
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #f5a623;
  padding: 10px;
  text-align: center;
  font-weight: lighter;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fff4e9;
  }
  &:last-child {
    border-bottom: 2px solid #f5a623; /* 마지막 줄에만 실선 추가 */
  }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  border-bottom: 2px dotted #f5a623;
`;

// 페이지네이션 스타일
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.button`
  background-color: transparent;
  border: none;
  margin: 10px 16px 0 0px;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    font-weight: bold;
    color: #f5a623;
  }
`;

const DashBoard = () => {
  // 더미 데이터
  const surveyData = [
    { id: 1, title: "OO 만족도 조사", period: "2024-09-01 ~ 2024-10-01" },
    {
      id: 2,
      title: "하반기 행사 설문 조사",
      period: "2024-09-01 ~ 2024-10-01",
    },
    {
      id: 3,
      title: "건강 및 운동 습관 조사",
      period: "2024-09-01 ~ 2024-10-01",
    },
    { id: 4, title: "OO제품 만족도 조사", period: "2024-09-01 ~ 2024-10-01" },
    {
      id: 5,
      title: "OO 프로그램에 대한 의견 조사",
      period: "2024-09-01 ~ 2024-10-01",
    },
    {
      id: 6,
      title: "여행 선호도 및 경향 조사",
      period: "2024-09-01 ~ 2024-10-01",
    },
    {
      id: 7,
      title: "미디어 소비 패턴 조사",
      period: "2024-09-01 ~ 2024-10-01",
    },
    {
      id: 8,
      title: "직장 내 업무 만족도 조사",
      period: "2024-09-01 ~ 2024-10-01",
    },
    {
      id: 9,
      title: "직장 내 업무 만족도 조사",
      period: "2024-09-01 ~ 2024-10-01",
    },
  ];
  return (
    <div>
      <Title>참여한 설문조사</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>번호</TableHeader>
            <TableHeader>설문 제목</TableHeader>
            <TableHeader>설문 기간</TableHeader>
          </tr>
        </thead>
        <tbody>
          {surveyData.map((survey, index) => (
            <TableRow key={survey.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{survey.title}</TableCell>
              <TableCell>{survey.period}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <PageNumber>◀</PageNumber>
        <PageNumber>1</PageNumber>
        <PageNumber>2</PageNumber>
        <PageNumber>3</PageNumber>
        <PageNumber>4</PageNumber>
        <PageNumber>5</PageNumber>
        <PageNumber>▶</PageNumber>
      </Pagination>
    </div>
  );
};

const Participation = () => {
  return (
    <MyPageContainer>
      <DashBoard />
    </MyPageContainer>
  );
};

export default Participation;
