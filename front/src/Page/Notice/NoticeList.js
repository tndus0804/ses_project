// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import styled from "styled-components";

// // 전체 컨테이너 스타일
// const Container = styled.div`
//   padding: 20px;
//   border: 1px solid #ff914d;
//   border-radius: 10px;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// // 제목 스타일
// const Title = styled.h2`
//   font-size: 28px;
//   margin-top: 20px;
//   margin-bottom: 5px;
//   color: #333;
//   text-align: left;
//   margin-left: 30px;
// `;

// // 헤더 컨테이너 스타일
// const HeaderContainer = styled.div`
//   display: flex;
//   justify-content: space-between; // 양 끝 정렬
//   align-items: center; // 세로 중앙 정렬
//   margin-bottom: 20px;
// `;

// // 검색창 스타일
// const SearchContainer = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const SearchInput = styled.input`
//   width: 200px;
//   padding: 8px;
//   border: 1px solid #ff914d;
//   border-radius: 4px;
//   outline: none;
//   margin-right: 10px;
// `;

// const SearchButton = styled.button`
//   background-color: #ff914d;
//   color: white;
//   border: none;
//   padding: 8px 16px;
//   border-radius: 4px;
//   cursor: pointer;
// `;

// // 테이블 스타일
// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   text-align: left;
//   font-size: 14px;
// `;

// const TableHeader = styled.th`
//   padding: 12px;
//   border-bottom: 2px solid #ff914d;
//   background-color: #f8f8f8;
//   text-align: center; // 가운데 정렬
// `;

// const TableRow = styled.tr`
//   &:nth-child(even) {
//     background-color: #fcfcfc;
//   }
// `;

// const TableData = styled.td`
//   padding: 12px;
//   border-bottom: 1px dashed #ff914d;
//   text-align: center; // 가운데 정렬
// `;

// // 버튼 스타일
// const Button = styled.button`
//   background-color: #ff7f50;
//   color: white;
//   padding: 10px 15px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-bottom: 20px;

//   &:hover {
//     background-color: #e76b39;
//   }
// `;

// // 페이지 네비게이션 스타일
// const Pagination = styled.div`
//   margin-top: 20px;
//   text-align: center;
// `;

// const PageNumber = styled.span`
//   margin: 0 5px;
//   cursor: pointer;
//   color: ${props => (props.active ? "#ff914d" : "#333")};
//   font-weight: ${props => (props.active ? "bold" : "normal")};
//   &:hover {
//     color: #ff914d;
//   }
// `;

// const NoticeList = ({ isAdmin }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [notices] = useState([
//     { id: 1, title: "서비스 점검 안내", author: "관리자", date: "2024-09-01", views: 123 },
//     { id: 2, title: "신규 기능 추가 안내", author: "운영자", date: "2024-09-02", views: 80 },
//     { id: 3, title: "서버 점검 일정", author: "관리자", date: "2024-09-03", views: 45 },
//     // 추가적인 공지사항 데이터
//   ]);

//   const [filteredNotices, setFilteredNotices] = useState(notices);

//   const handleSearch = () => {
//     const lowercasedTerm = searchTerm.toLowerCase();
//     const results = notices.filter(notice =>
//       notice.id.toString().includes(lowercasedTerm) ||
//       notice.title.toLowerCase().includes(lowercasedTerm)
//     );
//     setFilteredNotices(results);
//   };

//   return (
//     <Container>
//       {/* 헤더 컨테이너 */}
//       <HeaderContainer>
//         <Title>공지사항</Title>
//         {/* 관리자일 때만 공지사항 작성 버튼 표시 */}
//         {isAdmin && (
//           <Link to="/NoticeWrite">
//             <Button>공지사항 작성</Button>
//           </Link>
//         )}
//         {/* 검색창 */}
//         <SearchContainer>
//           <SearchInput 
//             placeholder="번호, 제목 검색" 
//             value={searchTerm} 
//             onChange={(e) => setSearchTerm(e.target.value)} 
//           />
//           <SearchButton onClick={handleSearch}>검색</SearchButton>
//         </SearchContainer>
//       </HeaderContainer>

//       {/* 공지사항 목록 테이블 */}
//       <Table>
//         <thead>
//           <tr>
//             <TableHeader>번호</TableHeader>
//             <TableHeader>제목</TableHeader>
//             <TableHeader>작성자</TableHeader>
//             <TableHeader>날짜</TableHeader>
//             <TableHeader>조회수</TableHeader>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredNotices.map(notice => (
//             <TableRow key={notice.id}>
//               <TableData>{notice.id}</TableData>
//               <TableData>{notice.title}</TableData>
//               <TableData>{notice.author}</TableData>
//               <TableData>{notice.date}</TableData>
//               <TableData>{notice.views}</TableData>
//             </TableRow>
//           ))}
//         </tbody>
//       </Table>

//       {/* 페이지 네비게이션 */}
//       <Pagination>
//         <PageNumber active>1</PageNumber>
//         <PageNumber>2</PageNumber>
//         <PageNumber>3</PageNumber>
//         <PageNumber>4</PageNumber>
//         <PageNumber>5</PageNumber>
//       </Pagination>
//     </Container>
//   );
// };

// export default NoticeList;


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
    const storedNotices = JSON.parse(localStorage.getItem("notices")) || [];
    setNotices(storedNotices);
    setFilteredNotices(storedNotices);
  }, []);

  const handleSearch = () => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const results = notices.filter(notice =>
      notice.id.toString().includes(lowercasedTerm) ||
      notice.title.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredNotices(results);
  };

  const handleDelete = (id) => {
    const updatedNotices = notices.filter(notice => notice.id !== id);
    setNotices(updatedNotices);
    setFilteredNotices(updatedNotices);
    localStorage.setItem("notices", JSON.stringify(updatedNotices));
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
          <tr>
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
              <TableData>{notice.id}</TableData>
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
