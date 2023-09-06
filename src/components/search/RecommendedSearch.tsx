import React, { useRef, useState, useCallback } from 'react';

import styled from 'styled-components';

interface RecommendationsProps {
	recommendations: string[];
	highlightText: (text: string) => React.ReactNode;
}

const RecommendedSearch: React.FC<RecommendationsProps> = ({
	recommendations,
	highlightText,
}) => {
	// 현재 선택된 자동완성 인덱스
	const [selectedItem, setSelectedItem] = useState<number>(-1);
	// 자동완성목록 컨테이너 요소
	const listRef = useRef<HTMLUListElement>(null);
	// 현재 선택된 아이템 요소
	const selectRef = useRef<HTMLUListElement>(null);

	const handleSelectItem = useCallback(
		(index: number) => {
			setSelectedItem(index);
		},
		[setSelectedItem]
	);

	

	return (
		<StyledRecommendedSearch>
			<span>추천검색어</span>
			{recommendations.length > 0 ? (
				<ul ref={listRef}>
					{recommendations.map((recommendation, index) => (
						<li
							key={index}
							className={selectedItem === index ? 'selected' : ''}
							onClick={() => handleSelectItem(index)}
						>
							{highlightText(recommendation)}
						</li>
					))}
				</ul>
			) : (
				<p>검색 결과가 없습니다.</p>
			)}
		</StyledRecommendedSearch>
	);
};

export default RecommendedSearch;

const StyledRecommendedSearch = styled.div`
	span {
		font-weight: bold;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		margin: 5px 0;
		padding: 5px;
		cursor: pointer;

		&:hover {
			background-color: gray;
		}
	}
`;
