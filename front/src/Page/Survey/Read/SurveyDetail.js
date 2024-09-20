import React, {useState, useEffect} from "react";
import styled from "styled-components";

const SurveyDetailDiv = styled.div`
	text-align: center;
`

const Table = styled.table`
	margin: 0 auto;
	width: 70%;
	text-align: left;
`

const Td = styled.td`
	border: 1px solid #FF9630;
	border-radius: 5px;
`

const ReplyInput = styled.input`
	width: 98%;
	height: 80%;
	text-align: center;
	border: none;
	&:focus {
		outline: none
	}
`

const ReplyBtn = styled.input`
	border: none;
	background: none;
	height: 100%;
	color: white;
	&:active {
		color: #FFB770;
	}
`;

const SurveyDetail = () => {
	const [surveyInfo, setSurveyInfo] = useState({});

	const fetchData = () => {
		// 게시글 정보 가져오기

		// 임시 데이터
		const tempSurveyInfo  = {
			title: "설문조사하세요",
			content: `설문조사내용설문조사내용설문조사내용설문조사내용
			설문조사내용설문조사내용설문조사내용설문조사내용설문조사내용
			설문조사내용설문조사내용설문조사내용설문조사내용설문조사내용
			설문조사내용설문조사내용설문조사내용설문조사내용설문조사내용
			설문조사내용설문조사내용설문조사내용설문조사내용설문조사내용`
		}

		setSurveyInfo(tempSurveyInfo);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<SurveyDetailDiv className=".surveyDetail">
			<Table style={{borderSpacing: "0px"}}>
				<thead>
					<tr>
						<Td style={{width: "60px", padding: "2px 0px",backgroundColor: "#FF9630", textAlign: "center",borderTopRightRadius: "0px", borderBottomRightRadius: "0px"}}>
							제목
						</Td>
						<Td style={{paddingLeft: "20px", borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px"}}>
							{surveyInfo.title}
						</Td>
					</tr>
				</thead>
				
			</Table>
			<Table>
				<tbody>
					<tr>
						<Td colSpan={2} style={{padding: "10px"}}>
							{surveyInfo.content}
						</Td>
					</tr>
				</tbody>
			</Table>

			<a href="#">폼 이동</a>


			<Table style={{borderSpacing: "0px"}}>
				<tbody>
					<tr>
						<Td style={{borderRadius: "5px 0px 0px 5px", textAlign: "center", height: "30px"}}>
							<ReplyInput/>
						</Td>
						<Td style={{borderRadius: "0px 5px 5px 0px", width: "60px", height: "30px", backgroundColor: "#FF9630"}}>
							<ReplyBtn type="button" value="작성버튼" />
						</Td>
					</tr>
				</tbody>
			</Table>
		</SurveyDetailDiv>
	)
};

export default SurveyDetail;
