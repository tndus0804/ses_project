import React, { useState } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextOverlayTop = styled.div`
  position: absolute;
  top: 240px;
  left: 0px;
  color: white;
  text-align: left;
  z-index: 1;
  padding: 50px;
  border-radius: 10px;
`;

const TextOverlayBottom = styled.div`
  position: absolute;
  bottom: 80px;
  left: 180px;
  color: white;
  text-align: left;
  z-index: 1;
  padding: 25px;
  border-bottom: 4px solid white;
  line-height: 1;
`;

const HeadingTop = styled.h1`
  font-family: 'Pretendard-Regular', serif;
  font-weight: 100; 
  margin: 0;
  font-size: 7rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeadingBottom = styled.h1`
  font-family: 'Pretendard-Regular', serif;
  font-weight: 400;
  margin: 0;
  font-size: 7rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
  gap: 200px;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%;
  text-align: center;
  margin-top: 120px;
  padding: 30px;
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
`;

const Paragraph = styled.p`
  font-family: 'GowunBatang-Regular', serif;
  font-size: 1.3rem;
  color: #7A6C6C;
  margin: 0;
`;

const NoticeSection = styled.div`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  width: 80%;
  max-width: 800px;
  text-align: center;
  margin-top: 130px;
`;

const NoticeTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
`;

const NoticeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
`;

const NoticeItem = styled.li`
  display: flex;
  justify-content: center; /* 중앙 배치 */
  align-items: center; /* 세로 가운데 정렬 */
  font-size: 1rem;
  color: #666;
  padding: 10px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const NoticeDate = styled.span`
  font-size: 0.9rem;
  color: #999;
  margin-left: 10px; /* 제목과 날짜 사이의 간격 10px */
`;

const MainPage = () => {
  const [notices, setNotices] = useState([
    { id: 1, title: "새로운 설문 디자인 항목들을 추가", date: "2024-10-15" },
    { id: 2, title: "2024.10.10 서비스 점검 완료", date: "2024-10-10" },
    { id: 3, title: "설문조사 끝낸 이후 약관 변경사항", date: "2024-09-30" },
    { id: 4, title: "회원가입 혜택 변경 안내", date: "2024-09-25" }
  ]);

  const sortedNotices = notices
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <MainContainer>
      <ImageContainer>
        <MainImage src="./main222.png" alt="Main image showing participation" />
        <TextOverlayTop>
          <HeadingTop>간단한 참여로</HeadingTop>
        </TextOverlayTop>
        <TextOverlayBottom>
          <HeadingBottom>변화를 주도하세요</HeadingBottom>
        </TextOverlayBottom>
      </ImageContainer>

      <ContentContainer>
        <ContentSection>
          <Paragraph>
            설문 작성 및 참여로 소중한 의견을 공유하세요.<br />
            쉽게 참여하고 간편하게 결과를 볼 수 있습니다.
          </Paragraph>
        </ContentSection>
        <ContentSection>
          <Paragraph>
            설문에 참여하면 포인트를 적립하고<br />
            포인트로 기프티콘을 받을 수 있습니다.
          </Paragraph>
        </ContentSection>
      </ContentContainer>

      <NoticeSection>
        <NoticeTitle>공지사항</NoticeTitle>
        <NoticeList>
          {sortedNotices.map((notice) => (
            <NoticeItem key={notice.id}>
              <div>{notice.title}</div>
              <NoticeDate>{notice.date}</NoticeDate>
            </NoticeItem>
          ))}
        </NoticeList>
      </NoticeSection>
    </MainContainer>
  );
};

export default MainPage;
