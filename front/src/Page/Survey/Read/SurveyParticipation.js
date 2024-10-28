import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

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
	const [surveyInfo, setSurveyInfo] = useState([]); // 질문 데이터를 저장하는 코드
	const [responses, setResponses] = useState({}); // 질문 응답을 저장하는 코드
	const [message, setMessage] = useState("");

	const { surveyId } = useParams(); // URL에서 :id 파라미터 추출
	// 틀
	let tempQuestionData = {
		surveyDTO: {
			surveyId: "",
			title: "",
			startDate: "",
			endDate: "",
			point: ""
		}, 
		surveyQuestion: [{
			questionText: "",
			questionType: "",
			optionType:""
		}]
	}
	let tempAnswerData = {
		
	}

	// 백엔드에서 질문 데이터를 가져오기
	const fetchSurveyData = async () => {
		console.log("dd")
		try {
			const response = await fetch(`http://localhost:9996/web/api/survey/getSurvey/${surveyId}`);
			
			if (!response.ok) {
				throw new Error("Failed to fetch survey data");
			}
			
			let data = await response.json();

			console.log("=22===========22==============")
			console.log(data)
			console.log("=33===========33==============")
			
			const surveyData = {
				surveyDTO: data.surveyDTO,
				// surveyQuestion: data.surveyQuestionDTOs
				// surveyDTO: {
				// 	surveyId: data.surveyDTO.surveyId,
				// 	title: data.surveyDTO.title,
				// 	startDate: data.surveyDTO.startDate,
				// 	endDate: data.surveyDTO.endData,
				// 	point: data.surveyDTO.points
				// }, 
				surveyQuestion: data.surveyQuestionDTOs.map(question => ({
					questionId: question.questionId,
					surveyId: question.surveyId,
					questionText: question.questionText,
					questionType: question.questionType,
					options: JSON.parse(question.options), // 배열로 변환
				}))
			}
			setSurveyInfo(surveyData);
			console.log(surveyInfo)
			console.log("=44444444444444==============")

			console.log(`타입은: ${typeof surveyData.surveyQuestion[0].options}`);

			// 질문 데이터를 가져온 후, 각 질문에 대한 빈 응답 배열 설정
			const initialResponses = surveyData.surveyQuestion.reduce((acc, question) => {
				acc[question.questionId] = "";
				return acc;
			}, {});

			setResponses(initialResponses);
		} catch (error) {
			console.error("Error fetching survey data: ", error)
		}
	}
	
	useEffect(() => {
		// 컴파운트가 마운트 될 때 데이터를 가져옴

		// 로그인 체크
		if (localStorage.getItem("token") == null) {
			setMessage("로그인 해주세요!")
			return;
		}

		fetchSurveyData();
		
	}, [])

	useEffect(() => {
		if (message !== null && message !== undefined && message !== "") {
			alert(message);
			setMessage("");
		} 
		
		// if (message) {
		// 	alert(message);
		// 	setMessage("");
		// }
			
	}, [message])


	// 응답 체크했을 때
	const handleInputChange = (questionId, value) => {
		// console.log(questionId, value)
		setResponses((prevResponses) => ({
			...prevResponses, 
			[questionId]: value 
			})
		);
	};

	// 설문 제출 버튼 눌렀을 때
	const handleSubmit = async (e) => {
		e.preventDefault();
		let isEmpty = false;

		if (localStorage.getItem("token") == null) {
			alert("로그인 해주세요!");
			return;
		}
		
		// 빈값 체크하기
		// responses.map((response) => { // 배열 일때, 
		// 	Object.entries(response).forEach(([key, value]) => {
		// 		if (value === "") {
		// 			isEmpty = true;
		// 		}
		// 	} );
		// })

		// 빈값 체크하기 => 객체일 때
		if (typeof responses == "object") {
			Object.entries(responses).forEach(([key, value]) => {
				if (value === "") {
					isEmpty = true;
				}
			})
		}

		if (isEmpty) {
			alert("작성이 완료되지 않은 항목이 있어요!");
			return;
		}
		
		// 백엔드로 제출
		let requestData = {
			token: localStorage.getItem("token"),
			responseDTO : {
				surveyId: surveyInfo.surveyDTO.surveyId,
				responses: JSON.stringify(responses)
			}
		}
		console.log("Form Submitted", JSON.stringify(requestData, null, 1) );
		try {
			const requestResponse = await fetch("http://localhost:9996/web/api/survey/responseSurveyQuestion", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData)
			})

			if (requestResponse.ok) {
				const result = await requestResponse.text();
				alert("응답이 완료 되었습니다.", result);
				window.location.href = "/"

			} else {
				const errorMessage = await requestResponse.text();
				console.error("응답 실패", errorMessage);
			}
		} catch (error) {
			console.error("서버 오류 발생", error);
		}

	}

	return (
		<Container className='surveyParticipation'>
			{/* <Title>SurveyParticipation</Title> */}
			{/* <button onClick={()=>console.log(responses)}>로그</button> */}
			<form onSubmit={handleSubmit}>
				{ surveyInfo.surveyDTO && (
					<Table style={{border: "1px solid black", width: "80%", marginBottom: "20px"}}>
						<thead>
							<tr>
								<TableCell>설문조사: {surveyInfo.surveyDTO.title}</TableCell>
							</tr>
							<tr>
								<TableCell>설문기간: {surveyInfo.surveyDTO.startDate == null ? "제한 없음" : ""}
								</TableCell>
							</tr>
						</thead>
						{/* 설문내용 */}
						<tbody>
							{surveyInfo.surveyQuestion && surveyInfo.surveyQuestion.map((question, index) => (
								<tr key={index}>
									<TableCell>
										<Label>{index + 1}. {question.questionText}</Label>
										<br />
										{/* 객관식 */}
										{question.questionType === "객관식" && (
											<div>
												{Array.isArray(question.options) && question.options.length > 0 ? (
													question.options.map((option, idx) => (
														<Label key={idx} style={{marginRight: "10px"}}>
															<RadioInput type="radio"
																	value={option}
																	name={`option-${index}`}
																	onChange={(e) => handleInputChange(question.questionId, e.target.value)}
																	
																	/>
																{option}
														</Label>
													))
												) : (
													<div>선택 가능한 옵션이 없습니다.</div>
												)}
													
											</div>
										)}
										{/* 주관식 */}
										{question.questionType === "주관식" && (
											<div>
												<Textarea placeholder="입력해주세요" onChange={(e) => handleInputChange(question.questionId, e.target.value)}
															/>
											</div>
										)}
									</TableCell>
								</tr>
							))}
						</tbody>
					</Table>
				)}
				<SubmitButton type="submit" style={{ padding: "10px 20px", backgroundColor: "#FF6C0A", color: "white", border: "none", borderRadius: "5px" }}>
					제출
				</SubmitButton>
			</form>
		</Container>
	);
};

export default SurveyParticipation;
