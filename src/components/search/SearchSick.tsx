import { SetStateAction, useState, useEffect, useCallback } from 'react';
import {
	SearchSickList,
	GetSickListResponseType,
} from '../../lib/api/SearchSickList';
import { HttpClient } from '../../lib/api/HttpClient';
import { useDebouncedSearch } from '../../context/DebouncedSearchContext';
import SearchBar from './SearchBar';
import { SearchContainer } from '../../styles/SearchInput';
import Button from '../commons/Button';
import RecommendedSearch from './RecommendedSearch';

const httpClient = new HttpClient();

function SearchSick() {
	const { query, setQuery, debouncedQuery } = useDebouncedSearch();
	const [isOpen, setIsOpen] = useState(false);
	const [sickList, setSickList] = useState<GetSickListResponseType | null>(
		null
	);

	const filteredSickList = debouncedQuery
		? sickList
			? {
					response: sickList.response.filter((sick) =>
						sick.sickNm.toLowerCase().includes(debouncedQuery.toLowerCase())
					),
			  }
			: null
		: null;

	const handleSearch = useCallback(async () => {
		const searchSickList = new SearchSickList(httpClient);
		if (debouncedQuery) {
			try {
				const result = await searchSickList.getSickList(debouncedQuery);
				setSickList(result);
			} catch (error) {
				console.error('API 호출 오류:', error);
			}
		}
	}, [debouncedQuery]);

	useEffect(() => {
		handleSearch();
	}, [handleSearch]);

	const handleClick = () => {
		setIsOpen(true);
		handleSearch();
	};

	const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
		const newQuery = e.target.value;
		setQuery(newQuery);
	};

	const highlightText = (text: string) => {
		const parts = text.split(new RegExp(`(${debouncedQuery})`, 'giu'));
		return (
			<>
				{parts.map((part, index) =>
					part.toLowerCase() === query.toLowerCase() ? (
						<mark key={index}>{part}</mark>
					) : (
						part
					)
				)}
			</>
		);
	};

	return (
		<div>
			<SearchContainer>
				<SearchBar
					query={query}
					setQuery={setQuery}
					onClick={handleClick}
					handleChange={handleChange}
				/>
				<Button onClick={handleClick} />
			</SearchContainer>
			{isOpen ? (
				<div style={{ backgroundColor: 'white' }}>
					<RecommendedSearch
						recommendations={
							filteredSickList
								? filteredSickList.response.map((sick) => sick.sickNm)
								: []
						}
						highlightText={highlightText}
					/>
				</div>
			) : null}
		</div>
	);
}

export default SearchSick;
