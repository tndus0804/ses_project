import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostPreview from "./../components/SurveyPreview";

let popularImgs = ["https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg"
	, "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg"
	, "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg"
]

const ContainerDiv = styled.div`

`;

const Table = styled.table`
	text-align: center;
	margin: 0 auto;
`;

const PostTHead = styled.thead`

`;

const PostTBody = styled.tbody`
	background-color: #FFF4E9;
`;

const Tr = styled.tr`
	height: 50px;
	&:hover {
		cursor: pointer
	}
`;

const Td = styled.td`
	min-width: 150px;
`;

const SurveyPostList = () => {
	// state
	const [postList, setPostList] = useState([]);

	let tempData= {
		postId: "", // 포스트 넘버
		userNum: "", // 유저 넘버
		title: "", // 제목
		content: "", // 내용
		category: "", // 카테고리
		views: "", // 조회수
		imagePath: "",
		visibility: "",
		privatePassword: "",
		createdAt: "",
		updatedAt: "",
		status: ""
	}

	useEffect(() => {
		getPost();
	}, [])

	const getPost = async () => {
		try {
			const response = await fetch("http://localhost:9996/web/api/post/selectAll")
		
			if (response.ok) {
				const result = await response.json(); // 응답 본문을 JSON으로 파싱
				console.log(result.posts)
				setPostList(result.posts)
			}
		} catch (error) {
			console.error("응답 실패", error);
		}
	}

	const participateSurvey = (postId) => {
		// console.log(postId);
		// return;
		window.location.href = `/surveyDetail/${postId}` // http://localhost:3000/df00
	}

	return (
		<ContainerDiv>
			<Table>
				<thead>
					<tr>
						<Td>번호</Td>
						<Td>제목</Td>
						<Td>작성자</Td>
						<Td>작성일</Td>
					</tr>
				</thead>
				<PostTBody>
					{postList.map((post, index) => (
						<Tr key={index} onClick={() => participateSurvey(post.postId)}>
							<Td>{index + 1}</Td>
							<Td>{post.title}</Td>
							<Td>{post.userName}</Td>
							<Td>{post.createdAt.split("T")[0]}</Td>
						</Tr>
						))
					}
				</PostTBody>
			</Table>
			
			
		</ContainerDiv>
	);
};

export default SurveyPostList;
