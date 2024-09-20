import React, { Fragment } from 'react'
import styled from "styled-components";

const ContainerDiv = styled.div``;

const PreviewImg = styled.img`
	width: 100%;
	border-radius: 30px;
`;

const SurveyPreview = (props) => {
	const src = props.src;
	const title = props.title;
	const replyCount = props.replyCount;
	const writer = props.writer;
	const created = props.created;
	const viewCount = props.viewCount;
	console.log(`파일 소스:  ${src}/${title}/${replyCount}/${writer}/${created}/${viewCount}`)

	return (
		<ContainerDiv>
			<PreviewImg src={src} />
			<p>{title} [{replyCount}]</p>
			<p>{writer}</p>
			<p><span>{created}</span> 조회수 <span>{viewCount}</span></p>
		</ContainerDiv>
	)
}

export default SurveyPreview