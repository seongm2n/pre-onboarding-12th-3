import styled from 'styled-components';

export const MainContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 100%;
	min-height: 100vh;
`;

export const TextSearchContainer = styled.div`
	height: 462px;
	display: flex;
	flex-direction: column;
	position: relative;
	width: 1040px;
`;

export const TextContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	padding: 0px 320px 0px 320px;
	position: relative;
	width: 1040px;

	p {
		font-family: 'Apple SD Gothic Neo-Bold', Helvetica;
		font-size: 34px;
		font-weight: 700;
		letter-spacing: -0.61px;
		line-height: 54.4px;
		margin-top: -1px;
		position: relative;
		text-align: center;
		width: fit-content;
	}
`;
