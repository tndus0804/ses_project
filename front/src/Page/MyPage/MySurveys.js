import React from "react";
import MyPageContainer from "./Components/MyPageContainer";
import styled from "styled-components";

// 제목(fix)
const Title = styled.h2`
  width: 1100px;
  font-weight: lighter;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
`;

// 테이블 스타일
const Table = styled.table`
  border-top: 2px solid #f5a623;
  width: 1000px;
  max-width: 1100px;
  border-collapse: collapse;
  margin-bottom: 20px;
  display: inline-table;
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

const DashBoard = () => {
  // 더미 데이터
  const surveyData = [
    {
      id: 1,
      title: "OO 만족도 조사",
      period: "2024-09-01 ~ 2024-10-01",
      members: "12/50",
    },
    {
      id: 2,
      title: "하반기 행사 설문 조사",
      period: "2024-09-01 ~ 2024-10-01",
      members: "12/50",
    },
  ];

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
            <TableRow key={survey.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{survey.title}</TableCell>
              <TableCell>{survey.period}</TableCell>
              <TableCell>{survey.members}</TableCell>
              <ButtonCell>
                <ActionButton onClick={() => handlePayment(survey.id)}>
                  결제
                </ActionButton>
                <ActionButton>내보내기</ActionButton>
              </ButtonCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
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
