import React from "react";
import MyPageSidebar from "../../Components/MyPageSidebar";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 40px;
`;
{
  /**
    회원 정보 수정
    비밀번호 입력하면 개인정보 수정 페이지로 이동
*/
}
const MyPageMain = () => {
  return (
    <PageContainer>
      <MyPageSidebar />
      <ContentContainer>
        {/* 여기에서 마이페이지의 메인 콘텐츠를 넣을 수 있습니다 */}
      </ContentContainer>
    </PageContainer>
  );
};

export default MyPageMain;
