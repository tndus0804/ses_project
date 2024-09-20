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

// 역할 선택 버튼 스타일
const RoleButton = styled.button`
  background-color: #ff914d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
`;

// 드롭다운 스타일
const Dropdown = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #ff914d;
  border-radius: 4px;
  margin-top: 5px;
  min-width: 100px;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const AdminUser = () => {
  const initialUsers = [
    { id: 1, username: "hong1", name: "홍길동", email: "hongroad123@gmail.com", address: "제주특별자치도 서귀포시 ○○로 111", birthdate: "1992.05.03", role: "유저" },
    { id: 2, username: "kim2", name: "김철수", email: "kimchulsoo@gmail.com", address: "서울특별시 강남구 ○○로 222", birthdate: "1990.01.15", role: "유저" },
    { id: 3, username: "lee3", name: "이영희", email: "leeyounghee@gmail.com", address: "부산광역시 해운대구 ○○로 333", birthdate: "1988.09.30", role: "유저" },
  ];

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [dropdownStates, setDropdownStates] = useState({});

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    setFilteredUsers(users); // 기본적으로 필터된 사용자 목록 업데이트
  }, [users]);

  const toggleDropdown = (id) => {
    setDropdownStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRoleChange = (id, newRole) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
    setDropdownStates((prev) => ({ ...prev, [id]: false }));
  };

  const handleSearch = () => {
    setFilteredUsers(
      users.filter(user =>
        user.id.toString().includes(searchTerm) ||
        user.username.includes(searchTerm) ||
        user.name.includes(searchTerm)
      )
    );
  };

  return (
    <AdminContainer>
      <Container>
        <Title>유저 관리</Title>

        {/* 검색창 */}
        <SearchContainer>
          <SearchInput 
            placeholder="유저 번호, 아이디, 이름 검색" 
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
              <TableHeader>역할</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableData>{user.id}</TableData>
                <TableData>{user.username}</TableData>
                <TableData>{user.name}</TableData>
                <TableData>{user.email}</TableData>
                <TableData>{user.address}</TableData>
                <TableData>{user.birthdate}</TableData>
                <TableData>
                  <RoleButton onClick={() => toggleDropdown(user.id)}>
                    {user.role} ▼
                  </RoleButton>
                  {dropdownStates[user.id] && (
                    <Dropdown>
                      <DropdownItem onClick={() => handleRoleChange(user.id, "유저")}>유저</DropdownItem>
                      <DropdownItem onClick={() => handleRoleChange(user.id, "관리자")}>관리자</DropdownItem>
                    </Dropdown>
                  )}
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

export default AdminUser;
