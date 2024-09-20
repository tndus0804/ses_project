import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";

// 스타일 컴포넌트 정의
const Container = styled.div`
	max-width: 800px;
	margin: 40px auto;
	padding: 20px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	
`;

const Title = styled.h1`
	text-align: center;
	color: #333;
	margin-bottom: 20px;
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin: 0 auto;
	margin-bottom: 20px;
`;

const TableCell = styled.td`
	padding: 12px;
	text-align: left;
	vertical-align: top;
	border: 1px solid #ddd;
`;

const TableHeader = styled.th`
	background-color: #f4f4f9;
	color: #555;
	padding: 10px;
	text-align: center;
	font-weight: bold;
`;

const Label = styled.label`
	margin-right: 15px;
	font-size: 14px;
	color: #333;
`;

const RadioInput = styled.input`
	margin-right: 5px;
`;

const Textarea = styled.textarea`
	width: 97%;
	height: 60px;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 14px;
	margin-top: 10px;
`;

const SubmitButton = styled.button`
	display: block;
	width: 80%;
	padding: 15px;
	background-color: #ff6c0a;
	color: white;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	cursor: pointer;
	transition: background-color 0.3s;
	margin: 0 auto;

	&:hover {
		background-color: #e65b00;
	}
`;

const SurveyParticipation = () => {
	// state 
	const [surveyInfo, setSurveyInfo] = useState([]);
	const [responses, setResponses] = useState([]);

	const surveyInfo1 = [{
		id: 1,
		title: "피크닉 조사",
		period: {
			mode: "limit",
			from: "2024.08.01",
			to: "2024.09.01"
		},
		questions: [
			{title: "피크닉 장소1", type: "객관식", options: ["박물관", "전시회", "수족관"]},
			{title: "어느 요일에?", type: "객관식", options: ["월요일", "화요일", "수요일"]},
			{title: "기타의견", type: "주관식", options: []}
		]
	}, {
		id: 2,
		title: "고객 만족도 조사",
		period: {
			mode: "noLimit",
			from: "2024.09.01",
			to: "2024.10.01"
		},
		questions: [
			{title: "피크닉 장소11", type: "객관식", options: ["박물관", "전시회", "수족관"]},
			{title: "어느 요일에?22", type: "객관식", options: ["월요일", "화요일", "수요일"]},
			{title: "기타의견33", type: "주관식", options: []}
		]
	}]

	// 백엔드에서 질문 데이터를 가져오기
	const fetchSurveyData = async () => {
		try {
			// const response = await fetch("http://~~") // 주소 입력
			// const data = await response.json();

			// 임시 데이터
			const data = surveyInfo1;

			setSurveyInfo(data);

			// 질문 데이터를 가져온 후, 각 질문에 대한 빈 응답 배열 설정
			const initialResponses = data.map((survey) => ({
				id: survey.id,
				answers: survey.questions.map(() => "")
			}));
			setResponses(initialResponses);
		} catch (error) {
			console.error("Error fetching survey data: ", error)
		}
	}

	useEffect(() => {
		// 컴파운트가 마운트 될 때 데이터를 가져옴
		fetchSurveyData();
	}, [])

	// 응답 체크했을 때
	const handleInputChange = (surveyId, questionIndex, value) => {
		setResponses((prevResponses) => 
			prevResponses.map((response) =>
				response.id == surveyId
					? {...response, answers: response.answers.map((answer, idx) => idx === questionIndex ? value : answer)}
					: response
			)
		);
	};

	// 설문 제출 버튼 눌렀을 때
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form Submitted", responses);
		// 백엔드로 제출
	}

	return (
		<Container className='surveyParticipation'>
			<Title>SurveyParticipation</Title>
			<form onSubmit={handleSubmit}>
				{surveyInfo.map(survey => (
					<Fragment key={survey.id}>
						<Table  style={{border:"1px solid black", width: "80%", marginBottom: "20px"}}>
							<tbody>
								<tr>
									<TableCell>설문조사: {survey.title}</TableCell>
								</tr>
								<tr>
									<TableCell>설문기간: {survey.period.mode == `limit`
											? `${survey.period.from} ~ ${survey.period.to}`: "기한 없음" }
									</TableCell>
								</tr>
								{/* 설문 내용 */}
								{survey.questions.map((question, index) => (
									<tr key={index}>
										<TableCell>
											<Label>{index + 1}. {question.title}</Label>
											<br />
											{/* 객관식 */}
											{question.type === "객관식" && (
												<div>
													{question.options.map((option, idx) => (
														<Label key={idx} style={{ marginRight: "10px" }}>
															<RadioInput type='radio'
																	name={`${survey.id}-${index}`}
																	value={option} 
																	onChange={() => handleInputChange(survey.id, index, option)}
																	checked={responses.find((response) => response.id === survey.id)?.answers[index] === option}
																	/>
																{option}
														</Label>
													))}
												</div>
											)}
											{/* 주관식 */}
											{question.type === "주관식" && (
												<div>
													<Textarea placeholder='의견을 입력하세요'
																value={responses.find((response) => response.id === survey.id)?.answers[index] || ""}
																onChange={(e) => handleInputChange(survey.id, index, e.target.value)}
																/>
												</div>
											)}
										</TableCell>
									</tr>
								))}
							</tbody>
						</Table>
					</Fragment>
				))}
				<SubmitButton type="submit" style={{ padding: "10px 20px", backgroundColor: "#FF6C0A", color: "white", border: "none", borderRadius: "5px" }}>
					제출
				</SubmitButton>
			</form>
		</Container>
	);
};

export default SurveyParticipation;
