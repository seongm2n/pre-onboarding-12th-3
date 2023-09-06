import React from 'react';

interface RecommendationsProps {
	recommendations: string[];
	highlightText: (text: string) => React.ReactNode;
}

const RecommendedSearch: React.FC<RecommendationsProps> = ({
	recommendations,
	highlightText,
}) => {
	return (
		<div>
			<p>추천검색어</p>
			{recommendations.length > 0 ? (
				<ul>
					{recommendations.map((recommendation, index) => (
						<li key={index}>{highlightText(recommendation)}</li>
					))}
				</ul>
			) : (
				<p>검색 결과가 없습니다.</p>
			)}
		</div>
	);
};

export default RecommendedSearch;
