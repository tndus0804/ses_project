import React, { useState, useEffect } from "react";
import MyPageMain from "../Page/MyPage/MyPageMain";
import styled from "styled-components";
import { Link } from "react-router-dom";

// 스타일 정의
const HeaderContainer = styled.header`
  background-color: #fff4e9;
  color: #000000;
  height: 70px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  position: relative;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Logo = styled.div`
  img {
    padding-top: 10px;
    height: 120px;
  }
`;

const MainNav = styled.nav`
  flex: 1;

  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;

    li {
      margin: 0 1rem;

      &:nth-child(2),
      &:nth-child(4) {
        position: relative;
        transform: translateY(2px);
        color: #000000;
        font-size: 18px;
      }

      a {
        color: #000000;
        text-decoration: none;
        padding: 0.5rem 1rem;
        display: block;
      }
    }
  }
`;

const AuthLinks = styled.div`
  display: flex;

  .btn {
    color: #000000;
    padding: 0.5rem 1rem;
    text-decoration: none;
    border-radius: 5px;
    margin-left: 0.5rem;
  }
`;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  // 로컬 스토리지에서 JWT 토큰을 확인하고, 유효성을 서버에서 검증
  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("/web/verify-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 포함하여 서버로 전송
          },
        });

        if (response.ok) {
          setIsLoggedIn(true); // 토큰이 유효하면 로그인 상태로 설정
        } else {
          setIsLoggedIn(false); // 토큰이 유효하지 않으면 비로그인 상태로 설정
          localStorage.removeItem("token"); // 잘못된 토큰 제거
        }
      } catch (error) {
        console.error("토큰 유효성 검사 실패", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false); // 토큰이 없으면 비로그인 상태로 설정
    }
  };

  // 페이지 로드 시 로그인 상태 확인
  useEffect(() => {
    checkLoginStatus(); // 컴포넌트 마운트 시 로그인 상태 확인
  }, []);

  // 로그아웃 처리 함수 (JWT 삭제)
  const handleLogout = () => {
    localStorage.removeItem("token"); // 로컬 스토리지에서 JWT 삭제
    setIsLoggedIn(false); // 로그아웃 상태로 설정
    window.location.href = "/"; // 로그인 페이지로 리디렉션
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        {/* 로고 이미지 */}
        <Logo>
          <a href="/">
            <img src="/logo111.png" alt="Logo" />
          </a>
        </Logo>

        {/* 중앙 메뉴 */}
        <MainNav>
          <ul>
            <li>
              <a href="/NoticeList">공지사항</a>
            </li>
            <li>|</li>
            <li>
              <a href="/surveyForm">설문조사 작성</a>
            </li>
            <li>|</li>
            <li>
              <a href="/surveyPostList">설문조사 게시판</a>
            </li>
            <li>|</li>
            <li>
              <a href="/surveyPostWrite">게시글 작성</a>
            </li>
          </ul>
        </MainNav>

        {/* 로그인 상태에 따른 링크 표시 */}
        <AuthLinks>
          {isLoggedIn ? (
            <>
              {/* 로그인 상태일 때 */}
              <span>
                <a href="/mypageMain">마이 페이지</a>
              </span>
              <button className="btn" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              {/* 로그인이 안 되어 있을 때 */}
              <a href="/loginForm" className="btn">
                로그인
              </a>
              <a href="/signup" className="btn">
                회원가입
              </a>
            </>
          )}
        </AuthLinks>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
