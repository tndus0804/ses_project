import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from "./Page/MainPage";
import NoticeList from "./Page/Notice/NoticeList";
import NoticeWrite from "./Page/Notice/NoticeWrite";
import Login from "./Page/User/Login";
import SignUp from "./Page/User/Signup";
import MyPageMain from "./Page/MyPage/MyPageMain";
import EditProfile from "./Page/MyPage/EditProfile";
import Participation from "./Page/MyPage/Participation";
import MySurveys from "./Page/MyPage/MySurveys";
import PointHistory from "./Page/MyPage/PointHistory";
import PaymentHistory from "./Page/MyPage/PaymentHistory";
import Cash from "./Page/MyPage/Cash";
import GlobalFontStyle from "./Components/GlobalFontStyle";
import Header from "./Components/Header";
import FindID from "./Page/User/FindID";
import FindPassword from "./Page/User/FindPassword";
import IdCheck from "./Page/User/IdCheck";

// 설문조사
import SurveyForm from "./Page/Survey/Write/SurveyForm";
import SurveyDetail from "./Page/Survey/Read/SurveyDetail";
import SurveySelect from "./Page/Survey/Write/SurveySelect";
import SurveyPostWrite from "./Page/Survey/Write/SurveyPostWrite";
import SurveyParticipation from "./Page/Survey/Read/SurveyParticipation";
import SurveyPostList from "./Page/Survey/Read/SurveyPostList";
import SurveyConnect from "./Page/Survey/components/SurveyConnect";

// import AdminSidebar from './Page/Admin/Components/AdminSidebar';
import AdminUser from "./Page/Admin/AdminUser";
import AdminSurvey from "./Page/Admin/AdminSurvey";
import AdminPost from "./Page/Admin/AdminPost";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <Router>
      <Header />
      <GlobalFontStyle />
      <div>
        <Routes basename="/web">
          <Route path="/" element={<MainPage />} />
          {/* 회원가입 / 로그인 */}
          <Route path="/loginForm" element={<Login />} />
          <Route path="/idCheck" element={<IdCheck />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/FindID" element={<FindID />} />
          <Route path="/FindPassword" element={<FindPassword />} />
          {/* 마이페이지 */}
          <Route path="/mypageMain" element={<MyPageMain />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/participation" element={<Participation />} />
          <Route path="/mySurveys" element={<MySurveys />} />
          <Route path="/pointHistory" element={<PointHistory />} />
          <Route path="/paymentHistory" element={<PaymentHistory />} />
          <Route path="/surveySelect" element={<SurveySelect />} />
          <Route path="/cash" element={<Cash />} />
          {/* 공지사항 */}
          <Route path="/NoticeList" element={<NoticeList />} />
          <Route
            path="/NoticeWrite"
            element={<NoticeWrite isAdmin={isAdmin} />}
          />

          <Route path="/surveyPostList" element={<SurveyPostList />} />
          <Route path="/surveyForm" element={<SurveyForm />} />
          <Route path="/surveyDetail" element={<SurveyDetail />} />
          <Route path="/surveyDetail/:postId" element={<SurveyDetail />} />
          <Route path="/surveySelect" element={<SurveySelect />} />
          <Route path="/surveyPostWrite" element={<SurveyPostWrite />} />
          <Route path="/surveyParticipation" element={<SurveyParticipation />} />
          <Route path="/surveyParticipation/:surveyId" element={<SurveyParticipation />} />
          <Route path="/SurveyConnect" element={<SurveyConnect />} />
          
          {/* 관리자 */}
          <Route path="/adminUser" element={<AdminUser />} />
          <Route path="/adminSurvey" element={<AdminSurvey />} />
          <Route path="/adminPost" element={<AdminPost />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
