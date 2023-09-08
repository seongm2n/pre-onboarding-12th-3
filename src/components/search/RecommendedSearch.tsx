import React, { useRef, useState, useCallback, useEffect } from 'react';
import useKeyPress from '../../hooks/useKeyPress';
import { StyledRecommendedSearch } from '../../styles/RecommendedStyle';
import { BiSearch } from 'react-icons/bi';

interface RecommendationsProps {
	recommendations: string[];
	highlightText: (text: string) => React.ReactNode;
	debouncedQuery: string;
}

const RecommendedSearch: React.FC<RecommendationsProps> = ({
	recommendations,
	highlightText,
	debouncedQuery,
}) => {
	// 현재 선택된 자동완성 인덱스
	const [selectedItem, setSelectedItem] = useState<number>(0);
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

	//새로운 검색 시작 시 selectedItem 초기화
	useEffect(() => {
		if (debouncedQuery !== '') {
			setSelectedItem(-1);
		}
	}, [debouncedQuery]);

	return (
		<StyledRecommendedSearch>
			<span>추천검색어</span>
			<hr />
			{recommendations.length > 0 ? (
				<ul ref={listRef}>
					{recommendations.map((recommendation, index) => (
						<li
							key={index}
							className={selectedItem === index ? 'selected' : ''}
							onClick={() => handleSelectItem(index)}
						>
							<BiSearch
								style={{
									marginRight: '2px',
									textAlign: 'center',
									color: 'gray',
								}}
							/>
							{highlightText(recommendation)}
						</li>
					))}
				</ul>
			) : (
				<p>검색어 없음</p>
			)}
		</StyledRecommendedSearch>
	);
};

export default RecommendedSearch;
