import React, { useState, useEffect } from "react";
import MyPageContainer from "./Components/MyPageContainer";
import styled from "styled-components";

// 제목(fix)
const Title = styled.h2`
  width: 1100px;
  // padding-bottom: 15px;
  display: -webkit-inline-box;
  font-weight: lighter;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto; /* 화면 중앙 정렬 */
  overflow-x: auto; /* 작은 화면에서 테이블이 넘치면 스크롤 생성 */
`;

const Table = styled.table`
  border-top: 2px solid #f5a623;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  display: compact; /* 작은 화면에서 스크롤 가능하게 만듦 */
  overflow-x: auto;
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #f5a623;
  padding: 10px;
  text-align: center;
  font-weight: lighter;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fff4e9;
  }
  &:last-child {
    border-bottom: 2px solid #f5a623;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  border-bottom: 2px dotted #f5a623;
  word-wrap: break-word; /* 내용이 너무 길 경우 줄바꿈 */
`;

const ButtonCell = styled.td`
  display: compact;
  justify-content: center;
  border-bottom: 2px dotted #f5a623;
`;

const ActionButton = styled.button`
  background-color: #ff9630;
  border: none;
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 15px;

  &:hover {
    background-color: #e5831d;
  }
`;

// 페이지네이션 스타일
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.button`
  background-color: transparent;
  border: none;
  margin: 10px 16px 0 0px;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    font-weight: bold;
    color: #f5a623;
  }
`;

const DashBoard = () => {
  const [surveyData, setSurveyData] = useState([]); // 설문 데이터를 저장할 state

  // 설문 데이터를 가져오는 함수
  const fetchSurveys = async () => {
    try {
      const response = await fetch("/web/api/mysurveys", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT 토큰을 헤더에 추가
        },
      });
      const data = await response.json();
      setSurveyData(data); // 데이터를 state에 저장
    } catch (error) {
      console.error("설문 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchSurveys(); // 컴포넌트가 마운트될 때 설문 데이터를 가져옴
  }, []);

  // 결제 요청 함수
  const handlePayment = async (surveyId) => {
    try {
      const response = await fetch("/api/pay/kakao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_name: "설문조사 결제",
          total_amount: 1000, // 예시 금액
          survey_id: surveyId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const redirectUrl = data.next_redirect_pc_url; // 결제 페이지 URL
        window.location.href = redirectUrl; // 결제 페이지로 이동
      } else {
        console.error("결제 요청 실패");
      }
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
    }
  };

  return (
    <Container>
      <Title>내가 만든 설문조사</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>번호</TableHeader>
            <TableHeader>설문 제목</TableHeader>
            <TableHeader>설문 기간</TableHeader>
            <TableHeader>인원</TableHeader>
            <TableHeader>결제 및 결과 출력</TableHeader>
          </tr>
        </thead>
        <tbody>
          {surveyData.map((survey, index) => (
            <TableRow key={survey.surveyId}>
              {" "}
              {/* survey.surveyId를 사용하여 고유한 값을 보장 */}
              <TableCell>{index + 1}</TableCell>
              <TableCell>{survey.title}</TableCell>
              <TableCell>
                {/* 날짜 형식화 */}
                {new Date(survey.startDate).toLocaleDateString()} -{" "}
                {new Date(survey.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{survey.participants}</TableCell>
              <ButtonCell>
                <ActionButton onClick={() => handlePayment(survey.surveyId)}>
                  결제
                </ActionButton>
                <ActionButton>내보내기</ActionButton>
              </ButtonCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PageNumber>◀</PageNumber>
        <PageNumber>1</PageNumber>
        <PageNumber>2</PageNumber>
        <PageNumber>3</PageNumber>
        <PageNumber>4</PageNumber>
        <PageNumber>5</PageNumber>
        <PageNumber>▶</PageNumber>
      </Pagination>
    </Container>
  );
};

const MySurveys = () => {
  return (
    <MyPageContainer>
      <DashBoard />
    </MyPageContainer>
  );
};

export default MySurveys;
