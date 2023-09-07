import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';

export const SearchButtonContainer = styled.button`
	background-color: #007be9;
	border-radius: 48px;
	height: 48px;
	padding: 13.5px 13.5px 13.5px;
	position: absolute;
	width: 48px;
	right: 10px;
`;

export const StyledBiSearch = styled(BiSearch)`
	height: 21px;
	width: 21px;
	color: white;
`;

export const CloseButton = styled.button`
	outline: 0;
	position: absolute;
	right: 70px;
	background: none;
	display: flex;
	align-items: center;
`;

export const StyledAiFillCloseCircle = styled(AiFillCloseCircle)`
	height: 25px;
	width: 25px;
	color: gray;
`;
