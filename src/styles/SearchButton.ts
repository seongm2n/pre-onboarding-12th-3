import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';

export const ButtonContainer = styled.button`
	align-items: center;
	background-color: #007be9;
	border-radius: 48px;
	display: flex;
	height: 48px;
	justify-content: center;
	padding: 13.5px 13.5px 13.5px;
	position: relative;
	width: 48px;
`;

export const StyledBiSearch = styled(BiSearch)`
	height: 21px;
	width: 21px;
	color: white;
`;
