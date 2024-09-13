import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from "./Page/MainPage";
import MyPage from "./Page/MyPage/MyPageMain";
import NoticeList from "./Page/Notice/NoticeList";
import SurveySelect from "./Page/Survey/Write/SurveySelect";
import SurveyPostList from "./Page/Survey/Read/SurveyPostList";
import Login from "./Page/User/Login";
import SignUp from "./Page/User/Signup";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/signUp">회원 가입</Link>
            </li>
            <li>
              <Link to="/mypage">마이 페이지</Link>
            </li>
            <li>
              <Link to="/notice">공지사항</Link>
            </li>
            <li>
              <Link to="/surveySelect">설문 선택</Link>
            </li>
            <li>
              <Link to="/surveyList">설문 게시판</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/notice" element={<NoticeList />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/surveySelect" element={<SurveySelect />} />
          <Route path="/surveyPostList" element={<SurveyPostList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
