import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LIST from "./Constants/menuList";

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
  margin-bottom: 300px;
`;

// 흰색 박스 스타일
const SidebarBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 95%;
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
    width: 80%;
    border-bottom: 1px solid #f5a623; // 구분선 추가

    &:after {
      content: "▶";
      font-size: 15px;
      color: #000000; // 주황색 화살표
      margin-left: 10px; // 화살표와 텍스트 간격
    }
  }

  &:hover {
    color: #f5a623; // 호버 시 주황색으로 텍스트 색상 변경
  }
`;
// title 수정 필요
const Sidebar = () => {
  const { title, edit, participation, surveys, point, payment, gifticons } =
    LIST;
  return (
    <SidebarContainer>
      <SidebarTitle>{title}</SidebarTitle>
      <SidebarBox>
        <SidebarItem to="/mypageMain" activeClassName="active">
          {edit}
        </SidebarItem>
        <SidebarItem to="/participation" activeClassName="active">
          {participation}
        </SidebarItem>
        <SidebarItem to="/mySurveys" activeClassName="active">
          {surveys}
        </SidebarItem>
        <SidebarItem to="/pointHistory" activeClassName="active">
          {point}
        </SidebarItem>
        <SidebarItem to="/paymentHistory" activeClassName="active">
          {payment}
        </SidebarItem>
        <SidebarItem to="/gifticons" activeClassName="active">
          {gifticons}
        </SidebarItem>
      </SidebarBox>
    </SidebarContainer>
  );
};

export default Sidebar;
