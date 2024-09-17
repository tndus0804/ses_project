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

const Container = styled.div`
  width: 100%;
`;

// 테이블 스타일
const Table = styled.table`
  border-top: 3px solid #f5a623;
  width: 1100px;
  border-collapse: collapse;
  margin-bottom: 20px;
  display: inline-table;
`;

const TableHeader = styled.th`
  border-bottom: 3px solid #f5a623;
  padding: 10px;
  text-align: center;
  font-weight: lighter;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fff4e9;
  }
  &:last-child {
    border-bottom: 3px solid #f5a623; /* 마지막 줄에만 실선 추가 */
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
  // 포인트 내역 더미 데이터
  const pointData = [
    {
      id: 1,
      title: "OO 만족도 조사",
      date: "2024-09-01",
      point: "1,000 P",
    },
    {
      id: 2,
      title: "하반기 행사 설문 조사",
      date: "2024-09-01",
      point: "2,000 P",
    },
    {
      id: 3,
      title: "건강 및 운동 습관 조사",
      date: "2024-09-01",
      point: "1,000 P",
    },
    {
      id: 4,
      title: "OO제품 만족도 조사",
      date: "2024-09-01",
      point: "1,000 P",
    },
    {
      id: 5,
      title: "OO 프로그램에 대한 의견 조사",
      date: "2024-09-01",
      point: "3,000 P",
    },
    {
      id: 6,
      title: "여행 선호도 및 경향 조사",
      date: "2024-09-01",
      point: "1,000 P",
    },
    {
      id: 7,
      title: "미디어 소비 패턴 조사",
      date: "2024-09-01",
      point: "5,000 P",
    },
    {
      id: 8,
      title: "직장 내 업무 만족도 조사",
      date: "2024-09-01",
      point: "1,000 P",
    },
  ];

  const pointSum = "15000";
  return (
    <Container>
      <Title>포인트내역 : {pointSum} P</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>번호</TableHeader>
            <TableHeader>설문 제목</TableHeader>
            <TableHeader>포인트 지급 날짜</TableHeader>
            <TableHeader>포인트</TableHeader>
          </tr>
        </thead>
        <tbody>
          {pointData.map((point, index) => (
            <TableRow key={point.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{point.title}</TableCell>
              <TableCell>{point.date}</TableCell>
              <TableCell>{point.point}</TableCell>
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
    </Container>
  );
};
const PointHistory = () => {
  return (
    <MyPageContainer>
      <DashBoard />
    </MyPageContainer>
  );
};

export default PointHistory;
