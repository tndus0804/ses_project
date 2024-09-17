import React from "react";
import MyPageContainer from "./Components/MyPageContainer";
import styled from "styled-components";

// 제목(fix)
const Title = styled.h2`
  width: 1100px;
  display: -webkit-inline-box;
  font-weight: lighter;
`;

// 날짜 선택 및 검색 컨테이너
const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-right: 50px;
  align-items: center;
  gap: 20px;
`;

const DateInput = styled.input`
  width: 200px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  text-align: center;
`;

const SearchButton = styled.button`
  background-color: #ff9630;
  border: none;
  width: 100px;
  padding: 10px 20px;
  margin-left: 20px;
  color: white;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e5831d;
  }
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
  const paymentData = [
    {
      id: 1,
      title: "OO 만족도 조사",
      purchaseDate: "2024-09-01",
      members: "12/50",
      personPoint: "1000",
      acounts: "12000",
    },
    {
      id: 2,
      title: "하반기 행사 설문 조사",
      purchaseDate: "2024-09-01",
      members: "12/50",
      personPoint: "1000",
      acounts: "12000",
    },
    {
      id: 3,
      title: "건강 및 운동 습관 조사",
      purchaseDate: "2024-09-01",
      members: "12/50",
      personPoint: "1000",
      acounts: "12000",
    },
    {
      id: 4,
      title: "OO제품 만족도 조사",
      purchaseDate: "2024-09-01",
      members: "12/50",
      personPoint: "1000",
      acounts: "12000",
    },
    {
      id: 5,
      title: "OO 프로그램에 대한 의견 조사",
      purchaseDate: "2024-09-01",
      members: "12/50",
      personPoint: "1000",
      acounts: "12000",
    },
    {
      id: 6,
      title: "여행 선호도 및 경향 조사",
      purchaseDate: "2024-09-01",
      members: "12/50",
      personPoint: "1000",
      acounts: "12000",
    },
    {
      id: 7,
      title: "미디어 소비 패턴 조사",
      purchaseDate: "2024-09-01",
      members: "12/50",
      personPoint: "1000",
      acounts: "12000",
    },
    {
      id: 8,
      title: "직장 내 업무 만족도 조사",
      purchaseDate: "2024-09-01",
      members: "12/50",
      personPoint: "1000",
      acounts: "12000",
    },
  ];
  return (
    <div>
      <Title>결제내역</Title>
      <SearchContainer>
        <DateInput type="date" value="2024-09-01" />
        <span> ~ </span>
        <DateInput type="date" value="2024-10-01" />
        <SearchButton>검색</SearchButton>
      </SearchContainer>

      <Table>
        <thead>
          <tr>
            <TableHeader>번호</TableHeader>
            <TableHeader>설문 제목</TableHeader>
            <TableHeader>구매날짜</TableHeader>
            {/* 설문 기간이 꼭 필요한지? */}
            {/* <TableHeader>설문 기간</TableHeader>  */}
            <TableHeader>참여 인원</TableHeader>
            <TableHeader>1인당 포인트</TableHeader>
            <TableHeader>결제 금액</TableHeader>
          </tr>
        </thead>
        <tbody>
          {paymentData.map((payment, index) => (
            <TableRow key={payment.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{payment.title}</TableCell>
              <TableCell>{payment.purchaseDate}</TableCell>
              <TableCell>{payment.members}</TableCell>
              <TableCell>{payment.personPoint}</TableCell>
              <TableCell>{payment.acounts}</TableCell>
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

const PaymentHistory = () => {
  return (
    <MyPageContainer>
      <DashBoard />
    </MyPageContainer>
  );
};

export default PaymentHistory;
