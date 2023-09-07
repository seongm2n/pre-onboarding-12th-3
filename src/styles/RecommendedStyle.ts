import styled from 'styled-components';

export const StyledRecommendedSearch = styled.div`
	padding: 20px;

	span {
		font-weight: bold;
		color: #ffb6c1;
	}

	ul {
		list-style-type: none;
		padding: 0;
		min-height: 200px;
		max-height: 400px;
		overflow-y: auto;
	}

	li {
		margin: 5px 0;
		padding: 5px;
		cursor: pointer;
		transition: background-color 0.2s;

		&.selected {
			background-color: pink;
			border-radius: 5px;
		}
	}

	p {
		font-size: 20px;
		color: rgb(220, 220, 220);
	}
`;

export const RecommendedContainer = styled.div`
	border-radius: 20px;
	background-color: white;
	margin-top: 7px;
	min-height: 40vh;
	max-height: 50vh;
	overflow: hidden;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
