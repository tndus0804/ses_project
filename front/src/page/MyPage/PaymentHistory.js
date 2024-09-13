import React from "react";
import MyPageSidebar from "./Components/MyPageSidebar";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 40px;
`;
const PaymentHistory = () => {
  return (
    <PageContainer>
      <MyPageSidebar />
      <ContentContainer>
        {/* 여기에서 마이페이지의 메인 콘텐츠 */}
      </ContentContainer>
    </PageContainer>
  );
};

export default PaymentHistory;
