import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';

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
`;

export const SearchInputContainer = styled.div`
	align-items: center;
	display: flex;
	position: relative;
	gap: 0.75rem;
`;

export const SearchInputBiSearch = styled(BiSearch)`
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 16px;
	padding: 4px 0px 0px;
	position: relative;
	width: 16px;
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
`;
