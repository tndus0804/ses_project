import React from "react";
import MyPageSidebar from "./MyPageSidebar";
import styled from "styled-components";

// 전체 레이아웃 컨테이너
const LayoutContainer = styled.div`
  display: flex;
  height: 100vh; // 페이지 전체 높이
  justify-content: center;
  padding: 20px;
`;

// 오른쪽의 콘텐츠 영역 (박스 형태)
const ContentContainer = styled.div`
  flex-grow: 1;
  margin-left: 30px; // 사이드바 너비 + 여백
  padding: 10px;
  background-color: #fff;
  border-radius: 15px;
  width: 60%;
  max-width: 1230px;
  // max-height: 690px;
  // 추후 회의 후 수정 예정
  text-align: center; // 중앙 정렬
  margin-top: 20px; // 콘텐츠가 사이드바 아래에 위치하게 하는 여백
  border: 3px solid #ff9630;
`;

const MyPageContainer = ({ children }) => {
  return (
    <LayoutContainer>
      <MyPageSidebar />
      <ContentContainer>{children}</ContentContainer>
    </LayoutContainer>
  );
};

export default MyPageContainer;
