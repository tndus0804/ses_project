import React from 'react';
import './header.css';

const Header = () => {
return (
    <header>
    <div className="header-container">
        {/* 로고 이미지 */}
        <div className="logo">
        <a href="/">
            <img src="/logo111.png" alt="Logo" />
        </a>
        </div>

        {/* 중앙 메뉴 */}
        <nav className="main-nav">
        <ul>
            <li><a href="/NoticeList">공지사항</a></li>
            <li>|</li>
            <li><a href="survey-create.html">설문조사 작성</a></li>
            <li>|</li>
            <li><a href="survey-board.html">설문조사 게시판</a></li>
        </ul>
        </nav>

        {/* 로그인 및 회원가입 */}
        <div className="auth-links">
        <a href="login" className="btn">로그인</a>
        <a href="signup" className="btn">회원가입</a>
        </div>
    </div>
    </header>
) 
}

export default Header   