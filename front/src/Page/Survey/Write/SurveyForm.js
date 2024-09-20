import React, { useState } from "react";
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
	border-radius: 10px;
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


const SurveyForm = () => {
	// 상태 정의
	const [periodType, setPeriodType] = useState('제한없음');
	const [questions, setQuestions] = useState([]);
	const [items, setItems] = useState({});

	// 기간 설정 핸들러
	const handlerPeriodChange = (e) => {
		setPeriodType(e.target.value);
	}

	// 질문 추가
	function addQuestion() {
		// console.log("질문 추가");
		const newId = Date.now();
		setQuestions([...questions, { id: newId, type: '객관식' }]);
		setItems(prevItems => ({
			...prevItems,
			[newId]: [] // 질문에 대한 빈 항목 배열 추가
		}));
	}

	// 질문 삭제 버튼
	function questionDeleteBtn(id) {
		setQuestions(questions.filter(question => question.id !== id));
		const updatedItems = { ...items };
		delete updatedItems[id];
		setItems(updatedItems);
	}

	// 질문 타입 변경 핸들러
	const handleQuestionTypeChange = (id, type) => {
		setQuestions(questions.map(question => 
			question.id === id ? { ...question, type } : question
		));
	}

	// 질문 항목 추가
	const addQuestItem = (questionId) => {
		setItems(prevItems => ({
			...prevItems,
			[questionId]: [...(prevItems[questionId] || [] ), ''] // 빈 문자열로 새로운 항목 추가
		}));
	}
	// 질문 항목 삭제
	const deleteQuestItem = (questionId, itemIndex) => {
		setItems(prevItems => ({
			...prevItems,
			[questionId]: prevItems[questionId].filter((_, index) => index !== itemIndex)
		}));
	}
	// 항목 텍스트 변경 핸들러
	const handleItemChange = (questionId, itemIndex, value) => {
		setItems(prevItems => ({
			...prevItems,
			[questionId]: prevItems[questionId].map((item, index) => 
				index === itemIndex ? value : item
			)
		}));
	}

	// 임시저장 
	const TempSaveBtnHandler = () => {
		//console.log("임시저장 버튼 클릭!");
	}
	// 제출 버튼
	const SubmitBtnHandler = () => {
		//console.log("제출 버튼 클릭!");
	}


	return (
		<ContainerDiv style={{textAlign: "center"}} className='survey-form' >
			{/* 설문조사 작성 페이지 */}
			<h1>설문조사</h1>
			<QuestionTable>
				<tbody>
					<tr>
						<td style={{width: "80px"}}>설문조사</td>
						<td><input type="text" /></td>
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
										<br/>시작 <input type="date"/> ~ <input type="date"/>
										<br/>종료 <input type="date"/> ~ <input type="date"/>
									</>
								)}
							</span>
						</td>
					</tr>
				</tbody>
			</QuestionTable>
			<Hr />
			<QuestionBtnP><Button onClick={addQuestion}>질문 추가</Button></QuestionBtnP>
			
			<div id='question-area'>
			{questions.map(question => (
				<QuestionDiv key={question.id}>
					<p>질문 : <input type="text" /></p>
					<p>
						<select
							value={question.type}
							onChange={(e) => handleQuestionTypeChange(question.id, e.target.value)}
						>
							<option>객관식</option>
							<option>주관식</option>
							<option>객관식 + 주관식</option>
						</select>
						<button onClick={() => addQuestItem(question.id)}>항목추가</button>
						<button onClick={() => questionDeleteBtn(question.id)}>삭제</button>
					</p>
					{question.type === "객관식" && (
						<>
							{items[question.id] && items[question.id].map((item, index) => 
								<div key={index}>
									<input type='radio' name={`${question.id}`} />
									<input type='text' value={item} onChange={(e) => handleItemChange(question.id, index, e.target.value)} />
									<button onClick={() => deleteQuestItem(question.id, index)}>삭제</button>
								</div>
							)}
						</>
					)}
					{question.type === "주관식" && (
						<>
						<div>주관식 관련 내용</div>
						{items[question.id] && items[question.id].map((item, index) => 
							<div key={index}>
								<input type='text' value={item} onChange={(e) => handleItemChange(question.id, index, e.target.value)} />
								<button onClick={() => deleteQuestItem(question.id, index)}>삭제</button>
							</div>
						)}
						</>
					)}
					{question.type === "객관식 + 주관식" && (
						<>
						<div>객관식 + 주관식 관련 내용</div>
						{items[question.id] && items[question.id].map((item, index) => 
							<div key={index}>
								<input type='text' value={item} onChange={(e) => handleItemChange(question.id, index, e.target.value)} />
								<button onClick={() => deleteQuestItem(question.id, index)}>삭제</button>
							</div>
						)}
						</>
					)}
				</QuestionDiv>
			))}
			</div>
			<ButtonContainer>
				<TempSave style={{marginRight: "20px"}} onClick={TempSaveBtnHandler} >
					임시저장
				</TempSave>
				<TempSave type="submit" onClick={SubmitBtnHandler}>
					제출
				</TempSave>
			</ButtonContainer>
		</ContainerDiv>
	)
};

export default SurveyForm;
