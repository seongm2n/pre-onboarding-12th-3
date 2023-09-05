import React from 'react';
import { useParams } from 'react-router-dom';

const SearchInfo: React.FC = () => {
	const { keyword } = useParams();
	return <div>검색한 결과: {keyword}</div>;
};
export default SearchInfo;
