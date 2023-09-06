import React, { useRef, useState, useCallback, useEffect } from 'react';
// import { useOutsideClick } from '../../hooks/useOutsideClick';
import styled from 'styled-components';
import useKeyPress from '../../hooks/useKeyPress';

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
	const upArrowPressed = useKeyPress('ArrowUp');
	const downArrowPressed = useKeyPress('ArrowDown');

	const handleSelectItem = useCallback(
		(index: number) => {
			setSelectedItem(index);
		},
		[setSelectedItem]
	);

	// 위쪽 화살표 키를 누를 때 이전 항목 선택
	useEffect(() => {
		if (upArrowPressed) {
			setSelectedItem((prevIndex) =>
				prevIndex === -1
					? recommendations.length - 1
					: Math.max(prevIndex - 1, 0)
			);
		}
	}, [upArrowPressed, recommendations.length]);

	// 아래쪽 화살표 키를 누를 때 다음 항목 선택
	useEffect(() => {
		if (downArrowPressed) {
			setSelectedItem((prevIndex) =>
				prevIndex === -1
					? 0
					: Math.min(prevIndex + 1, recommendations.length - 1)
			);
		}
	}, [downArrowPressed, recommendations.length]);
	
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
		transition: background-color 0.2s;

		&:hover {
			background-color: gray;
		}

		&.selected {
			background-color: lightblue; // 선택한 항목의 배경색을 원하는 색상으로 변경하세요.
		}
	}
`;
