import React, { useState, useEffect } from 'react'
import styled from "styled-components";

const SurveyTd = styled.td`
	width: 150px;
	text-align: center;
	border: 1px solid grey;
`;

const SurveyConnect = () => {
    const [surveys, setSurveys] = useState([]);

	// 호출한 곳으로 데이터 넘기기
	const handleSendData = (surveyId) => {
		const data = {message: surveyId}; // 보내고 싶은 데이터
		window.opener.postMessage(data, "*"); // 메인 창으로 데이터 전송
		window.close(); // 전송 후 창 닫기
	}

	const getSurveys = async () => {
		let requestData= {
			token: localStorage.getItem("token")
		}
		console.log(typeof requestData);
		try {
			const response = await fetch(`http://localhost:9996/web/api/survey/selectAll`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(requestData)
			});
			
			if (!response.ok) {
				throw new Error("Failed to fetch survey data");
			}
			let data = await response.json();
			console.log(data.surveys)
			setSurveys(data.surveys);
		} catch (error) {
			console.error(error);
		}
	}


	useEffect(() => {
		getSurveys();
	}, [])

	return (
		<div>
			내가 만든 설문조사
			<table>
				<thead>
					<tr>
						<SurveyTd>id</SurveyTd>
						<SurveyTd>설문조사 이름</SurveyTd>
						<SurveyTd>작성일</SurveyTd>
						<SurveyTd></SurveyTd>
					</tr>
				</thead>
				<tbody>
					{surveys.map((survey) => {
						return (
							<tr>
								<td>{survey.surveyId}</td>
								<td>{survey.title}</td>
								<td>{survey.createdAt.split("T")[0]}</td>
								<td><button type='button' onClick={() => handleSendData(survey.surveyId)}>선택</button></td>
							</tr>
						)
					})
					}
				</tbody>
			</table>
		</div>
	)
}

export default SurveyConnect