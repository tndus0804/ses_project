import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ContainerDiv = styled.div`
	border: 1px solid #FF9630;
	width: 90%;
	margin: 0 auto;
	padding: 0 20px;
	padding-bottom: 20px;
	box-sizing: border-box;
	border-radius: 10px;
`;

const  Hr = styled.hr`
	border: none;
	height: 1px;
	background-color: #FF9630;
`;

const QuestionTable = styled.table`
	
	width: 100%;
	text-align: left;
`;
const QuestionBtnP = styled.p`
	text-align: right;
`;

const QuestionDiv = styled.div`
	border: 1px solid black;
	// border-radius: 10px;
	text-align: left;
	padding: 5px 20px;
	margin-bottom: 10px;
`;

const Button = styled.button`
	background-color: #FFB770;
	border: none;
	border-radius: 5px;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between; // 버튼 간격을 동일하게 설정
	width: 50%; // 컨테이너 너비
	margin: 0 auto; // 가운데 정렬
`;

const TempSave = styled.button`
	background-color: #FFB770;
	border: none;
	border-radius: 5px;

	&:hover {
		background-color: #FF9630; // 호버시 색상 변경
	}
`;

const RealSave = styled.button`
	background-color: #FFB770;
	border: none;
	border-radius: 5px;
	margin: 0 auto;

	&:hover {
		background-color: #FF9630; // 호버시 색상 변경
	}
`;



const SurveyForm = () => {
	// 상태 정의
	const [title, setTitle] = useState("");
	const [periodType, setPeriodType] = useState('제한없음');
	const [questions, setQuestions] = useState([]);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [description, setDescription] = useState('');
	const [point, setPoint] = useState(0);
	const [alertMessage, setAlertMessage] = useState("");
	const [participants, setParticipants] = useState(0);



	// 기간 설정 핸들러
	const handlerPeriodChange = (e) => {
		setPeriodType(e.target.value);
	}

	// 질문 추가
	function addQuestion() {
		// console.log("질문 추가");
		const newId = Date.now();
		const itemId = Date.now(); // 항목 ID를 생성
		const newQuestion = {
			id: newId,
			type: '객관식',
			title: '',
			items: [
				{ 
					itemId: itemId,
					content: "" // 기본 항목 내용
				}
			]
		};
		setQuestions([...questions, newQuestion ]);
	}

	// 질문 삭제
	function deleteQuestion(questionId) {
		
		if (questions.length <= 1) {
			alert("삭제할 수 없습니다.");
			return;
		}
		setQuestions(questions.filter(question => question.id !== questionId));
	}

	// 질문 항목 추가
	const addQuestItem = (questionId) => {
		setQuestions(prevQuestions => 
			prevQuestions.map(question => 
				question.id === questionId
				? { ...question, items: [...question.items, {itemId: Date.now(), content: ''}] }
				: question
			)
		)
		console.log(`현재 설문조사: ${JSON.stringify(questions)}\n타입: ${typeof questions}`);
	}

	// 질문 항목 삭제
	const deleteQuestItem = (questionId, itemId) => {
		const questionToUpdate = questions.find(question => question.id === questionId);

		// items의 길이를 체크하고, 1개 이하인 경우 alert
		if (questionToUpdate && questionToUpdate.items.length <= 1) {
			setAlertMessage("1개 미만으로 설정할 수 없습니다.1");
			return; // 상태를 업데이트하지 않음
		}

		// items에서 해당 itemId를 가진 항목 삭제
		setQuestions(prevQuestions =>
			prevQuestions.map(question => {
				if (question.id === questionId) {
					return {
						...question,
						items: question.items.filter(item => item.itemId !== itemId)
					};
				}
				return question;
			})
		);
	}

	useEffect(() => {
		if (alertMessage) {
			alert(alertMessage);
			setAlertMessage(""); // 한 번만 알림을 표시하기 위해 메시지를 초기화
		}
	}, [alertMessage])

	useEffect(()=>{
		addQuestion();
		// setTitle("오늘 점심");
		// setDescription("오늘 점심 추천해주세요")
	}, [])

	// 질문 타입 변경 핸들러
	const changeQuestionTypeHandle = (questionId, type) => {
		// setQuestions(questions.map(question =>
		// 	question.id === questionId ? { ...question, type } : question
		// ))
		console.log(`${type}이 되었습니다.`);
		const _itemId = Date.now();
		const newItem = {
			itemId: _itemId,
			content: ""
		};

		setQuestions(prevQuestions =>
			prevQuestions.map(question =>
				question.id === questionId
					? {
						...question,
						type: type,
						items: type === "주관식" ? [newItem] : question.items // 주관식일 경우 newItem을 배열로 설정
					}
					: question
			)
		);
	}
	
	// 항목 타이틀 텍스트 변경 핸들러
	const itemTitleChangeHandler = (questionId, newTitle) => {

		setQuestions(prevQuestions =>
			prevQuestions.map(question =>
				question.id === questionId
					? {...question, title: newTitle}
					: question
			)
		);
	}

	// 항목 텍스트 변경 핸들러
	const itemChangeHander = (questionId, index, value) => {
		// console.log(`input 값 변경`);
		setQuestions(prevQuestions =>
			prevQuestions.map(question => {
				if (question.id === questionId) {
					const updatedItems = question.items.map((item, i) => {
						if (i === index) {
							return { ...item, content: value }; // 해당 항목의 내용을 업데이트
						}
						return item;
					});
					return { ...question, items: updatedItems }; // 전체 질문 객체를 업데이트
				}
				return question;
			})
		);
	}

	// 임시저장 
	const TempSaveBtnHandler = () => {
		//console.log("임시저장 버튼 클릭!");
	}
	// 제출 버튼
	const SubmitBtnHandler = async () => {
		let data = {};

		// 제목
		if (title == null || title == '' ) {
			alert("제목을 입력하여 주십시오"); return;
		}

		// 기간
		if (periodType == "기간지정") {
			console.log(`${startDate}부터 ${endDate}까지`);
			
			if (startDate == '' || endDate == '') {
				alert(`날짜가 정해지지 않았습니다.`);
				return;
			}
		}

		// 질문 
		if (questions.length < 1 ) {
			alert("질문을 등록해주세요.")
			return;
		}
		console.log(`설문조사 개수: ${questions.length}`)
		// if(questions.lenth) 
		
		if (localStorage.getItem("token") == null) {
			alert("로그인 해주세요");
			return;
		} 
		data = {
			surveyDTO: {
				title: title,
				points: point,
				description: description,
				participants: participants,
			}, 
			surveyQuestionDTOs: questions.map(question => ({
				questionText: question.title, // 질문 제목을 surveyText로 할당
				questionType: question.type, // 질문 유형을 questionType으로 할당
				options: question.items.map(item => item.content) // 선택지를 배열로
			})),
			startDate: startDate,
			endDate: endDate,
			question: questions,
			periodType: periodType,
			questions: questions,
			token: localStorage.getItem("token")
		}

		
		// 포인트 
		if (point < 0 || point > 1000000) {
			alert("0에서 100만원 사이에 값을 입력해주세요");
			return;
		}
		
		console.log(`값: ${JSON.stringify(data, null, 1)}`);
		console.log(`질문: ${JSON.stringify(questions)}`);
		// console.log(`응답: ${JSON.stringify(items)}`);
		
		try {
			const response = await fetch("http://localhost:9996/web/api/survey/writeSurvey", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			// 서버 응답 상태와 본문 확인
			console.log(`서버 응답 상태: ${response.status}`);

			// 서버 응답 확인
			if (response.ok) {
				const result = await response.json(); // 응답 본문을 JSON으로 파싱
				console.log("응답 성공: ", result);
				alert("설문조사가 성공적으로 제출되었습니다!");

				window.location.href="/";
				
				// 필요시 추가작업
				// window.location.href = '/some-page'; // 예: 제출 후 리다이렉트
			} else {
				const errorMessage = await response.text();
				console.error("응답 실패:", errorMessage);
				alert(`설문조사 제출 실패: ${errorMessage}`);
			}
		} catch (error) {
			console.error("서버 오류 발생", error);
			alert("서버와의 통신 중 오류가 발생하였습니다. 다시 시도해 주세요.")
		}
	} // SubmitBtnHandler

	// 시작 날짜 변경 핸들러
	const startDateChangeHandler = (e) => {
		setStartDate(e.target.value);
		// 종료 날짜 초기화 (시작 날짜 변경시)
		if (endDate && e.target.value > endDate) {
			setEndDate('');
		}
	};

	// 종료 날짜 변경 핸들러
	const endDateChangeHandler = (e) => {
		setEndDate(e.target.value);
	};

	// 포인트
	const changePointHandler = (e) => {
		let _point = e.target.value;
		console.log(`입력된 포인드 ${_point}`);
		if (_point < 0) {
			e.target.value = 0;
		} else if (_point > 1000000) {
			e.target.value = 1000000;
		}
		setPoint(Number(_point));
	}

	return (
		<ContainerDiv style={{textAlign: "center"}} className='survey-form' >
			{/* 설문조사 작성 페이지 */}
			<h1>설문조사</h1>
			{/* <button onClick={()=>console.log(`${JSON.stringify(questions, null, 1)}`)}>로그 조회</button> */}
			
			<QuestionTable>
				<tbody>
					<tr>
						<td style={{width: "80px"}}>설문조사</td>
						<td><input id="surveyTitle" value={title} onChange={(e) => setTitle(e.target.value)} required type="text"  /></td>
					</tr>
					<tr>
						<td>간단한 설명</td>
						<td><input type="text" placeholder="설명을 입력해 주세요." value={description} onChange={(e) => setDescription(e.target.value)} required/></td>
					</tr>
					<tr>
						<td style={{height: "80px"}}>설문 기간</td>
						<td>
							<input type='radio' id='period-none' name='period' value="제한없음" checked={periodType === "제한없음"} onChange={handlerPeriodChange} />
							<label htmlFor='period-none'>제한없음</label>
							
							<input type='radio' id='period-set' name='period' value="기간지정" checked={periodType === "기간지정"} onChange={handlerPeriodChange}/>
							<label htmlFor='period-set'>기간 지정</label>
							
							<span id="period-select">
								{periodType === "기간지정" && (
									<>
									<br/>기간 <input type="date" id="period-from" value={startDate} onChange={startDateChangeHandler}/> ~ <input type="date" id="period-to" value={endDate} onChange={endDateChangeHandler} min={startDate} />
									</>
								)}
							</span>
						</td>
					</tr>
					{/* <tr>
						<td>지급 포인트</td>
						<td><input type="number" value={point} onChange={(e) => {
							changePointHandler(e);
							setPoint(e.target.value);
							}}/></td>
					</tr> */}
				</tbody>
			</QuestionTable>
			<Hr />
			<QuestionBtnP><Button onClick={addQuestion}>질문 추가</Button></QuestionBtnP>
			
			<div id='question-area'>
			{questions.map(question => (
				<QuestionDiv key={question.id}>
					<p>
						질문 : <input onChange={(e) => itemTitleChangeHandler(question.id, e.target.value) } type="text" />
						{
							question.type == "객관식" && (
								<button onClick={() => addQuestItem(question.id)}>항목추가</button>
							)
						}
						<button onClick={() => deleteQuestion(question.id)}>삭제</button>
					</p>
					<p>
						<select
							value={question.type}
							onChange={(e) => changeQuestionTypeHandle(question.id, e.target.value)}
						>
							<option>객관식</option>
							<option>주관식</option>
						</select>
					</p>
					{question.type === "객관식" && (
						<>
							{question.items.map((item, index) => 
								<div key={index}>
									<input type='text' value={item.content} onChange={(e) => itemChangeHander(question.id, index, e.target.value)} />
									<button onClick={() => deleteQuestItem(question.id, item.itemId)}>삭제</button>
								</div>
							)}
						</>
					)}
				</QuestionDiv>
			))}
			</div>
			<ButtonContainer>
				{/* <TempSave style={{marginRight: "20px"}} onClick={TempSaveBtnHandler} >
					임시저장
				</TempSave> */}
				<RealSave type="submit" onClick={SubmitBtnHandler}>
					제출
				</RealSave>
			</ButtonContainer>
		</ContainerDiv>
	)
};

export default SurveyForm;
