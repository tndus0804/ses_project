import React, { useState } from "react";
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

const AdminPayment = () => {
  // 결제 데이터 예시
  const [payments] = useState([
    { id: 23, username: "hong1", name: "홍길동", email: "hongroad123@gmail.com", address: "제주특별자치도 서귀포시", birthdate: "1992.05.03" },
    { id: 25, username: "kim111", name: "김철수", email: "kim123@gmail.com", address: "광주광역시 ㅇㅇ동 ㅇㅇ길 123 ㅇㅇ빌딩", birthdate: "2001.12.19" },
    { id: 26, username: "young1004", name: "김영희", email: "young1004@gmail.com", address: "서울특별시 ㅇㅇ구 ㅇㅇ로 456 ㅇㅇ빌딩 2층", birthdate: "1994.06.02" },
    // 추가 데이터
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPayments, setFilteredPayments] = useState(payments);

  const handleSearch = () => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = payments.filter(payment =>
      payment.id.toString() === lowercasedTerm ||
      payment.username.toLowerCase().includes(lowercasedTerm) ||
      payment.name.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredPayments(filtered);
  };

  return (
    <AdminContainer>
      <Container>
        <Title>결제 관리</Title>

        {/* 검색창 */}
        <SearchContainer>
          <SearchInput 
            placeholder="번호, 아이디, 이름 검색" 
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
              <TableHeader>아이디</TableHeader>
              <TableHeader>이름</TableHeader>
              <TableHeader>이메일</TableHeader>
              <TableHeader>주소</TableHeader>
              <TableHeader>생년월일</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableData>{payment.id}</TableData>
                <TableData>{payment.username}</TableData>
                <TableData>{payment.name}</TableData>
                <TableData>{payment.email}</TableData>
                <TableData>{payment.address}</TableData>
                <TableData>{payment.birthdate}</TableData>
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

export default AdminPayment;
