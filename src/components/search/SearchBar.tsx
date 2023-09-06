import React, { SetStateAction, useCallback } from 'react';
import { StyledInput, SearchInputContainer } from '../../styles/SearchBar';

interface SearchBarProps {
	query: string;
	setQuery: (value: SetStateAction<string>) => void;
	onClick: () => void;
	handleChange: (e: { target: { value: SetStateAction<string> } }) => void;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(
	({ query, setQuery, onClick, handleChange }) => {
		const memoizedHandleChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				setQuery(e.target.value);
			},
			[setQuery]
		);

		return (
			<SearchInputContainer>
				<StyledInput
					type='text'
					placeholder='질환명을 입력해주세요'
					value={query}
					onChange={memoizedHandleChange}
					onClick={onClick}
				/>
			</SearchInputContainer>
		);
	}
);

export default SearchBar;
