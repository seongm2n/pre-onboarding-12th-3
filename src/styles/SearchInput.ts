import styled from 'styled-components';

export const SearchContainer = styled.div`
	align-items: center;
	background-color: #ffffff;
	border: 2px solid;
	border-color: #ffffff;
	border-radius: 42px;
	display: flex;
	padding: 10px 8px 2px 8px;
	border-bottom-width: 10px;
	width: 490px;
	flex-direction: row;
	justify-content: space-between;
	border: 1px solid #ccc;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	padding: 10px;
	outline: none;
`;

export const SearchInputContainer = styled.div`
	align-items: center;
	display: flex;
	position: relative;
	gap: 0.75rem;
`;

export const StyledInput = styled.input`
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
	width: 380px;
	padding-left: 15px;
	&:focus::placeholder {
		color: transparent; 
	}
`;

export const RecommendedContainer = styled.div`
	background-color: white;
	border-radius: 20px;
	margin-top: 8px;
`;
