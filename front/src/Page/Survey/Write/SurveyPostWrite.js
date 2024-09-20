import React, { useState } from "react";
import styled from "styled-components";

const SurveyPostWriteDiv = styled.div`
	width: 80%;
	margin: 0 auto;
	font-family: Arial, sans-serif;
`;

const FormGroupDiv = styled.div`
	margin-bottom: 1.5rem;
`;

const Label = styled.label`
	font-size: 1.2rem;
	display: block;
	margin-bottom: 0.5rem;
`;
const SurveyPostWriteInput = styled.input`
	width: 100%;
	padding: 0.5rem;
	font-size: 1rem;
	border: 1px solid #ccc;
	border-radius: 5px;
`;

const SurveyPostWriteTextarea = styled.textarea`
	width: 100%;
	padding: 0.5rem;
	font-size: 1rem;
	border: 1px solid #ccc;
	border-radius: 5px;
	height: 100px;
`;

const Topics = styled.div`
	margin-bottom: 1rem;
	border: 1px solid #FFB770;
	border-radius: 10px;
	padding: 5px;
`;

const Subtopics = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	
`;

const SubtopicsButton = styled.button`
	padding: 0.5rem 1rem;
	border: 1px solid #FF8C00;
	background-color: #FF8C00;
	color: white;
	border-radius: 5px;
	cursor: pointer;
	&.selected {
		background-color: #FF4500;
	}
`;

const SubmitButton = styled.button`
	background-color: #FF8C00;
	color: white;
	padding: 0.7rem 1.5rem;
	font-size: 1.1rem;
	border: none;
	border-radius: 5px;
	cursor: pointer;
`;

const H4 = styled.h4`
	margin-top: 1rem;
	font-size: 1rem;
`;
const H1 = styled.h1`
	text-align: center;
`;

const SurveyPostWrite = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [selectedTopics, setSelectedTopics] = useState([]);
	const [paymentPoint, setPaymentPoint] = useState("");

	const topics = [
		{ category: "엔터테인먼트 · 예술", subtopics: ["문학 · 예술", "영화", "드라마", "미술 · 디자인", "공연 · 전시"] },
		{ category: "운동 · 액티비티", subtopics: ["러닝 · 산책", "등산", "헬스", "스키", "클라이밍", "자전거", "서핑"] },
	]

	// 주제 선택했을 때
	const handleTopicClick = (topic) => {
		if (selectedTopics.includes(topic)) {
			setSelectedTopics(selectedTopics.filter((t) => t !== topic));
		} else {
			setSelectedTopics([...selectedTopics, topic]);
		}
	}

	// 폼 제출
	const handleSubmit = (e) => {
		e.preventDefault();
		const surveyData = {
			title,
			content,
			selectedTopics,
			paymentPoint,
		};
		console.log("submitted Survey Data: ", surveyData);
		// 서버로 데이터 전송 코드
	}
	return (
		<SurveyPostWriteDiv>
			{/* 설문조사 게시글 작성 */}
			<H1>게시글 작성</H1>
			<form onSubmit={handleSubmit}>
				<FormGroupDiv className="formGroup">
					<Label htmlFor='title'>제목</Label>
					<SurveyPostWriteInput type='text' id='title' value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='제목을 입력하세요'/>
				</FormGroupDiv>
				<FormGroupDiv className="formGroup">
					<Label htmlFor='content'>내용</Label>
					<SurveyPostWriteTextarea type='text' id='title' value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder='내용을 입력하세요'/>
				</FormGroupDiv>
				<FormGroupDiv className="formGroup">
					<Label>관심 주제 설정</Label>
					<Topics className="topics">
						{topics.map((topicCategory) => (
							<div key={topicCategory.category}>
								<H4>{topicCategory.category}</H4>
								<Subtopics className="subtopics">
									{topicCategory.subtopics.map((subtopic) => (
										<SubtopicsButton type='button' key={subtopic}
											className={selectedTopics.includes(subtopic) ? "selected" : ""}
											onClick={() => handleTopicClick(subtopic)}>
												{subtopic}
										</SubtopicsButton>
									))}
								</Subtopics>
							</div>
						))}
					</Topics>
				</FormGroupDiv>
				<FormGroupDiv className="formGroup">
					<Label htmlFor='paymentPoint'>지급 포인트</Label>
					<SurveyPostWriteInput type='text' id='paymentPoint' value={paymentPoint}
						onChange={(e) => setPaymentPoint(e.target.value)}
						placeholder='포인트 입력'/>
				</FormGroupDiv>
				<SubmitButton type='submit' className="submitButton">
					작성 버튼
				</SubmitButton>
			</form>
		</SurveyPostWriteDiv>
	);
};

export default SurveyPostWrite;
