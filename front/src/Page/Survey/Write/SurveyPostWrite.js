import React, { useState, useEffect } from "react";
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
	const [surveyNum, setSurveyNum] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	// 설문조사 연결
	const connectSurvey = () => {
		let w = window.open('/SurveyConnect', '설문조사 연결', 'top=200, left=500 width=700, height=500');
	}
	
	

	useEffect(() => {
		const handleReceiveMessage = (event) => {
			const {message} = event.data;
			if (message != undefined) {
				console.log(message);
				setSurveyNum(message);
			}
		}

		window.addEventListener("message", handleReceiveMessage);

		// 언마운트 시 리스너 제거
		return () => {
			window.removeEventListener("message", handleReceiveMessage);
		}
	}, [])

	// 폼 제출
	const handleSubmit = async (e) => {
		e.preventDefault();
		// 로그인 여부 체크
		if (localStorage.getItem("token") == null) {
			alert("로그인 해주세요!");
			return;
		}
		// 제목 입력 여부 체크
		if (title == "") {
			alert('제목을 입력해주세요!');
			return;
		}
		// 게시글 선택 여부
		if (typeof surveyNum != "number") {
			alert("게시글을 선택해주세요!");
			return;
		}
		// 내용 선택 여부
		if (content == "") {
			alert("내용을 입력해주세요!");
			return;
		}

		// 내용 입력 여부 체크

		const requestData = {
			postDTO: {
				title: title,
				content: content,
				surveyId: surveyNum
			},
			token: localStorage.getItem("token")
		};
		console.log("submitted Survey Data: ", requestData);
		// 서버로 데이터 전송 코드
		try {
			const response = await fetch("http://localhost:9996/web/api/post/write", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData)
			})

			// 서버 응답 상태와 본문 확인
			// console.log(`서버 응답 상태: ${response.status}`);

			// 서버 응답 확인
			if (response.ok) {
				const result = response.json();
				alert("설문조사가 성공적으로 제출되었습니다!");

				window.location.href="/";

			} else {
				const errorMessage = await response.text();
				alert(`게시글 제출 실패: ${errorMessage}`);
			}
				
		} catch(error) {
			console.error(error);
		}
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
					<button type="button" onClick={connectSurvey}>설문조사 선택</button> : {typeof surveyNum == "number" ? surveyNum : "선택을 해주세요"}
				</FormGroupDiv>
				<FormGroupDiv className="formGroup">
					<Label htmlFor='content'>내용</Label>
					<SurveyPostWriteTextarea type='text' id='title' value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder='내용을 입력하세요'/>
				</FormGroupDiv>
				<SubmitButton type='submit' className="submitButton">
					작성 버튼
				</SubmitButton>
			</form>
		</SurveyPostWriteDiv>
	);
};

export default SurveyPostWrite;
