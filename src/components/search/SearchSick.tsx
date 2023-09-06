import {
	SetStateAction,
	useState,
	useEffect,
	useCallback,
	useRef,
} from 'react';
import {
	SearchSickList,
	GetSickListResponseType,
} from '../../lib/api/SearchSickList';
import { HttpClient } from '../../lib/api/HttpClient';
import { useDebouncedSearch } from '../../context/DebouncedSearchContext';
import SearchBar from './SearchBar';
import { SearchContainer } from '../../styles/SearchBar';
import { RecommendedContainer } from '../../styles/RecommendedStyle';
import Button from '../commons/Button';
import RecommendedSearch from './RecommendedSearch';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { AiFillCloseCircle } from 'react-icons/ai';

const httpClient = new HttpClient();

function SearchSick() {
	const { query, setQuery, debouncedQuery } = useDebouncedSearch();
	const [sickList, setSickList] = useState<GetSickListResponseType | null>(
		null
	);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const searchRef = useRef(null);

	const searchContainerRef = useRef(null);
	const [isSearchContainerFocused, setIsSearchContainerFocused] =
		useState(false);

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

	const closeSearch = () => {
		setIsSearchOpen(false);
		setQuery('');
	};

	useOutsideClick({
		ref: searchRef,
		handler: closeSearch,
	});

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
						<strong
							style={{ color: 'hotpink' }}
							key={index}
						>
							{part}
						</strong>
					) : (
						part
					)
				)}
			</>
		);
	};

	return (
		<div ref={searchRef}>
			<SearchContainer
				ref={searchContainerRef}
				onFocus={() => setIsSearchContainerFocused(true)} // 포커스되었을 때 상태 변경
				onBlur={() => setIsSearchContainerFocused(false)} // 포커스가 해제되었을 때 상태 변경
				style={{
					border: isSearchContainerFocused ? 'solid 2px #007be9' : '',
				}}
			>
				<SearchBar
					query={query}
					setQuery={setQuery}
					onClick={() => setIsSearchOpen(true)}
					handleChange={handleChange}
				/>
				<button
					onClick={closeSearch}
					style={{ outline: '0' }}
				>
					<AiFillCloseCircle style={{ height: '21px', width: '21px' }} />
				</button>

				<Button />
			</SearchContainer>
			{isSearchOpen && (
				<RecommendedContainer>
					<RecommendedSearch
						recommendations={
							filteredSickList
								? filteredSickList.response.map((sick) => sick.sickNm)
								: []
						}
						highlightText={highlightText}
					/>
				</RecommendedContainer>
			)}
		</div>
	);
}

export default SearchSick;
