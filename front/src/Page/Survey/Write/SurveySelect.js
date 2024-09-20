import React from "react";
import styled from "styled-components";

const StyledButton = styled.button `
	--width: 30%;
	padding: 10px 20px;
	background-color: #FFB770;
	color: white;
	border: none;
	border-radius: 30px;

	width: var(--width);
	height: calc(var(--width) / 2); 
	
	&:active {
		background-color: #FF4500;
	}
`;

const H1 = styled.h1`
	
`;

const SurveySelect = () => {
	function googleFormBtn() {
		console.log("구글 폼으로 이동합니다."); // ->구글 폼 api
		alert("구글 폼으로 이동.");
	}

	function formWriteBtn() {
		console.log("폼 작성 폼으로 이동합니다."); // -> survey Form
		alert("폼 작성 페이지로 이동.");
	}

	return (
		<div style={{textAlign:"center"}}>
			<H1>설문조사 작성</H1>
			<div>
				<StyledButton onClick={googleFormBtn} style={{marginRight: "3px", marginRight: "20px"}}>구글 폼</StyledButton>
				<StyledButton onClick={formWriteBtn}>폼 작성</StyledButton>
			</div>
		</div>
	);
};

export default SurveySelect;
