import React from "react";
import styled from "styled-components";
import PostPreview from "./../components/SurveyPreview";

let popularImgs = ["https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg"
	, "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg"
	, "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg"
]

const ContainerDiv = styled.div`

`;

const PostImg = styled.img`
	width: 25%;
`;

const PopularDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
`;
const PopularCellDiv = styled.div`
	width: 25%;
	margin-bottom: 20px;
	margin: 0 10px;
`;
const PopularCellImg = styled.img`
	// width: "100%"
	width: 100px;
	height: 100%;
	object-fit: cover;
`;

const SearchDiv = styled.div`
	background-color: #FFD7AF;
	width: 90%;
	margin: 0 auto;
	border-radius: 10px;
	text-align: center;
	padding-bottom: 1px;
`;

const SearchTable = styled.table`
	text-align: left;
	margin: 0 auto; 
	margin-bottom: 5px;
	background-color: white;
	border-radius: 10px;
	width: 98%;
`;

const PostViewList = styled.div`
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(3, 1fr);
	width: 90%;
	gap: 10px;

`;

const PostViewItem = styled(PostPreview)`
	border: 1px solid red;
	display: block;
	width: 100%;
`;

const PopularPreview = styled(PostPreview)`
	display: block;
	height: 100%;
`;


const SurveyPostList = () => {
	

	return (
		<ContainerDiv>
			<p>인기순위</p>
			<PopularDiv>
				{popularImgs.map((img, idx) => (
					<PopularCellDiv key={idx} className="popularCellDiv">
						<PopularPreview src={img} title="[수원시] 마을만들기 기본계획 수립" replyCount="26" writer="수원시" created="2021.07.21." viewCount="112" />
					</PopularCellDiv>
				))}
			</PopularDiv>
			<SearchDiv>
				<input type="text" /><input type="button" value="검색" />
				<SearchTable>
					<tbody>
						<tr>
							<th>성별</th>
							<td>
								<input type="checkbox" /> 남성 <input type="checkbox" /> 여성 <input type="checkbox" /> 기타
							</td>
						</tr>
						<tr>
							<th>연령대</th>
							<td>
								<input type="checkbox" /> 10대 <input type="checkbox" /> 20대 <input type="checkbox" /> 30대 <input type="checkbox" /> 40대 <input type="checkbox" /> 50대 <input type="checkbox" /> 60대 <input type="checkbox" /> 70대 <input type="checkbox" /> 80대 
							</td>
						</tr>
						<tr>
							<th>직업</th>
							<td>
								<input type="checkbox" /> 학생 <input type="checkbox" /> 대학생 <input type="checkbox" /> 취업준비생 <input type="checkbox" /> 공무원 
							</td>
						</tr>
						<tr>
							<th>이상형</th>
							<td>
								<input type="checkbox" /> 
							</td>
						</tr>
					</tbody>
				</SearchTable>
			</SearchDiv>

			<hr />
			<PostViewList>
				<PostViewItem src="https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg" title="[수원시] 마을만들기 기본계획 수립" replyCount="26" writer="수원시" created="2021.07.21." viewCount="112" />
				<PostViewItem src="https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg" title="[수원시] 마을만들기 기본계획 수립" replyCount="26" writer="수원시" created="2021.07.21." viewCount="112" />
			</PostViewList>
		</ContainerDiv>
	);
};

export default SurveyPostList;
