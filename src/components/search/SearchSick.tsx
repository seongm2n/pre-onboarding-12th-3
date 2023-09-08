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
import { SearchInputContainer } from '../../styles/SearchBar';
import { RecommendedContainer } from '../../styles/RecommendedStyle';
import SearchButton from '../commons/SearchButton';
import RecommendedSearch from './RecommendedSearch';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { CloseButton, StyledAiFillCloseCircle } from '../../styles/Button';
import { KeywordQueryData, SickData } from 'sickType';
import localCache from '../../lib/cache/localCache';

interface SearchSickProps extends KeywordQueryData {
	useCache: boolean;
}

const httpClient = new HttpClient();
const RECOMMENDATION_NUMBER = 10;

const SearchSick = ({ useCache }: SearchSickProps) => {
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
					response: sickList.response.filter(
						({ sickNm }) =>
							debouncedQuery.toLowerCase() ===
							sickNm.slice(0, debouncedQuery.length).toLowerCase()
					),
			  }
			: null
		: null;

	const handleSearch = useCallback(async () => {
		const searchSickList = new SearchSickList(httpClient);
		if (debouncedQuery && debouncedQuery.length) {
			try {
				let result = useCache ? localCache.readFromCache(debouncedQuery) : null;
				if (!result || !result.length) {
					result = await searchSickList.getSickList(debouncedQuery, useCache);
					// 결과를 캐시에 저장
					localCache.writeToCache(debouncedQuery, result.response);
				}
				setSickList(result);
			} catch (error) {
				console.error('API 호출 오류:', error);
			}
		}
	}, [debouncedQuery, useCache]);
	const closeSearch = () => {
		setIsSearchOpen(false);
	};

	const cancelSearch = () => {
		setIsSearchOpen(false);
		setQuery('');
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

	useEffect(() => {
		handleSearch();
	}, [handleSearch]);

	useOutsideClick({
		ref: searchRef,
		handler: closeSearch,
	});

	return (
		<div ref={searchRef}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					position: 'relative',
				}}
			>
				<SearchInputContainer
					ref={searchContainerRef}
					onFocus={() => setIsSearchContainerFocused(true)}
					onBlur={() => setIsSearchContainerFocused(false)}
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
				</SearchInputContainer>

				<CloseButton onClick={cancelSearch}>
					<StyledAiFillCloseCircle />
				</CloseButton>

				<SearchButton />
			</div>

			{isSearchOpen && (
				<RecommendedContainer>
					<RecommendedSearch
						recommendations={
							filteredSickList
								? filteredSickList.response
										.map((sick) => sick.sickNm)
										.slice(0, RECOMMENDATION_NUMBER)
								: []
						}
						highlightText={highlightText}
						debouncedQuery={''}
					/>
				</RecommendedContainer>
			)}
		</div>
	);
};

export default SearchSick;
