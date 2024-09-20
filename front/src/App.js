import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from "./Page/MainPage";
import NoticeList from "./Page/Notice/NoticeList";
import Login from "./Page/User/Login";
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

// 설문조사
import SurveyForm from "./Page/Survey/Write/SurveyForm";
import SurveyDetail from "./Page/Survey/Read/SurveyDetail";
import SurveySelect from "./Page/Survey/Write/SurveySelect";
import SurveyPostWrite from "./Page/Survey/Write/SurveyPostWrite";
import SurveyParticipation from "./Page/Survey/Read/SurveyParticipation";
import SurveyPostList from "./Page/Survey/Read/SurveyPostList";
import SurveyPreview from "./Page/Survey/components/SurveyPreview";


const App = () => {
  return (
    <Router>
      <Header />
      <GlobalFontStyle />
      <div>
        <nav>
          <ul>
            {/* <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/signUp">회원 가입</Link>
            </li> */}
            <li>
              <Link to="/mypageMain">마이 페이지</Link>
            </li>
            {/* <li>
              <Link to="/notice">공지사항</Link>
            </li>
            <li>
              <Link to="/surveySelect">설문 선택</Link>
            </li>
            <li>
              <Link to="/surveyList">설문 게시판</Link>
            </li> */}
            <li>
              <Link to="/editProfile">회원정보 수정</Link>
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
          <Route path="/surveyForm" element={<SurveyForm />} />
          <Route path="/surveyDetail" element={<SurveyDetail />} />
          <Route path="/surveySelect" element={<SurveySelect />} />
          <Route path="/surveyPostWrite" element={<SurveyPostWrite />} />
          <Route path="/surveyParticipation" element={<SurveyParticipation />} />
          <Route path="/surveyPostList" element={<SurveyPostList />} />
          <Route path="/surveyPreview" element={<SurveyPreview />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
