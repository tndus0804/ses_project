import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import API_URL from './Config';

// 전체 컨테이너 스타일
const Container = styled.div`
    padding: 40px;
    border: 1px solid #ff914d;
    order-radius: 10px;
    max-width: 800px;
    margin: 40px auto;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    background-color: #fff;
`;

// 제목 스타일
const Title = styled.h2`
    font-size: 32px;
    margin-bottom: 20px;
    color: #333;
    border-bottom: 2px solid #ff914d;
    padding-bottom: 10px;
`;

// 내용 스타일
const Content = styled.p`
    font-size: 18px;
    line-height: 1.6;
    color: #555;
    margin-bottom: 20px;
    padding: 30px;
    white-space: pre-wrap;
`;

const InfoText = styled.p`
    font-size: 14px;
    color: #777;
    margin: 5px 0;
    text-align: right; // 오른쪽 정렬
`;

const BackButton = styled.button`
    background-color: #ff914d;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 15px;
    cursor: pointer;
    display: block; /* 블록 요소로 설정 */
    margin: 20px auto; /* 상하 마진 20px, 좌우 자동으로 중앙 정렬 */

    &:hover {
        background-color: #e76b39;
    }
`;

const NoticeDetail = () => {
    const { id } = useParams();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
    const fetchNoticeDetail = async () => {
        try {
            const response = await axios.get(`${API_URL}/notice/${id}`);
            console.log(response.status); 
            console.log(response.data);
            setNotice(response.data);
        } catch (error) {
            console.error("Error fetching notice:", error);
            // navigate("/NoticeList"); // 에러 발생 시 공지 목록 페이지로 이동
        } finally {
            setLoading(false);
        }
    };

    fetchNoticeDetail();
    }, [id, navigate]);

    if (loading) {
    return <div>Loading...</div>; // 로딩 중 표시
    }

    if (!notice) {
    return <div>공지사항을 찾을 수 없습니다.</div>; // 공지사항이 없을 경우
    }

    return (
    <Container>
        <Title>{notice.title}</Title>
        <InfoText>
        작성자: {notice.adminNum?.author} &nbsp; 날짜: {new Date(notice.createdAt).toLocaleDateString()} &nbsp; 조회수: {notice.views}
        </InfoText>
        <Content>{notice.content}</Content>
        <BackButton onClick={() => navigate("/NoticeList")}>목록</BackButton>
    </Container>
    );
};

export default NoticeDetail;