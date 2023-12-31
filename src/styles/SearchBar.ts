import styled from 'styled-components';

export const SearchInputContainer = styled.div`
	background-color: #ffffff;
	border: solid 1px whitesmoke;
	border-radius: 42px;
	display: flex;
	padding: 10px 8px 10px 8px;
	width: 490px;

	cursor: pointer;
`;

export const StyledInput = styled.input`
	border: 0;
	border-radius: 42px;
	outline: none;
	color: #a7afb7;
	font-family: 'Apple SD Gothic Neo-Regular', Helvetica;
	font-size: 18px;
	font-weight: 400;
	letter-spacing: -0.32px;
	line-height: 28.8px;
	margin-top: -1px;
	position: relative;
	white-space: nowrap;
	width: fit-content;
	width: 375px;
	height: 40px;
	padding-left: 15px;
	cursor: pointer;
	&:focus::placeholder {
		color: transparent;
	}
`;
