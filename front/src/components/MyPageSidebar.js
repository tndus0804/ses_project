import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

// Sidebar 전체 스타일 (주황색 배경)

const SidebarContainer = styled.div`
  width: 250px;
  height: 550px;
  background-color: #f5a623; // 주황색 배경
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 흰색 박스 스타일
const SidebarBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 93%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SidebarTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 30px;
  text-align: center;
`;

// 각각의 항목 스타일
const SidebarItem = styled(NavLink)`
  color: black;
  text-decoration: none;
  padding: 10px;
  margin: 10px 0;
  text-align: center;
  font-size: 18px;
  width: 80%;
  border-bottom: 1px solid #f5a623; // 구분선 추가

  &.active {
    font-weight: bold;
    border: none; // 구분선 대신 활성화된 링크 강조
  }

  &:hover {
    color: #f5a623; // 호버 시 주황색으로 텍스트 색상 변경
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarTitle>마이페이지</SidebarTitle>
      <SidebarBox>
        <SidebarItem to="/editProfile" activeClassName="active">
          회원정보 수정
        </SidebarItem>
        <SidebarItem to="/participation" activeClassName="active">
          참여한 설문조사
        </SidebarItem>
        <SidebarItem to="/mySurveys" activeClassName="active">
          내가 만든 설문조사
        </SidebarItem>
        <SidebarItem to="/pointHistory" activeClassName="active">
          포인트 내역
        </SidebarItem>
        <SidebarItem to="/paymentHistory" activeClassName="active">
          결제 내역
        </SidebarItem>
        <SidebarItem to="/gifticons" activeClassName="active">
          기프티콘 구매
        </SidebarItem>
      </SidebarBox>
    </SidebarContainer>
  );
};

export default Sidebar;
