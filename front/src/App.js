import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from "./Page/MainPage";
import NoticeList from "./Page/Notice/noticeList";
import SurveySelect from "./Page/Survey/Write/SurveySelect";
import SurveyPostList from "./Page/Survey/Read/SurveyPostList";
import Login from "./Page/User/login";
import SignUp from "./Page/User/Signup";
import MyPageMain from "./Page/MyPage/MyPageMain";
import EditProfile from "./Page/MyPage/EditProfile";
import Participation from "./Page/MyPage/Participation";
import MySurveys from "./Page/MyPage/MySurveys";
import PointHistory from "./Page/MyPage/PointHistory";
import PaymentHistory from "./Page/MyPage/PaymentHistory";
import Gifticons from "./Page/Pay/Gifticon";
import GlobalFontStyle from "./Components/GlobalFontStyle";
import Header from "./Components/Header";

const App = () => {
  return (
    <Router>
    <Header />
      <GlobalFontStyle />
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
              <Link to="/mypageMain">마이 페이지</Link>
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
          {/* 회원가입 / 로그인 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          {/* 마이페이지 */}
          <Route path="/mypageMain" element={<MyPageMain />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/participation" element={<Participation />} />
          <Route path="/mySurveys" element={<MySurveys />} />
          <Route path="/pointHistory" element={<PointHistory />} />
          <Route path="/paymentHistory" element={<PaymentHistory />} />
          <Route path="/gifticons" element={<Gifticons />} />
          <Route path="/surveySelect" element={<SurveySelect />} />
          {/* 공지사항 */}
          <Route path="/notice" element={<NoticeList />} />

          <Route path="/surveyPostList" element={<SurveyPostList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
