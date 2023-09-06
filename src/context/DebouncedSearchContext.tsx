import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

// Context 타입 정의
interface DebouncedSearchContextType {
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
	debouncedQuery: string;
}

// Context 생성
const DebouncedSearchContext = createContext<
	DebouncedSearchContextType | undefined
>(undefined);

// 커스텀 훅 생성
export const useDebouncedSearch = (): DebouncedSearchContextType => {
	const context = useContext(DebouncedSearchContext);
	if (!context) {
		throw new Error(
			'useDebouncedSearch must be used within a DebouncedSearchProvider'
		);
	}
	return context;
};

// Context 제공자 컴포넌트
interface DebouncedSearchProviderProps {
	children: ReactNode;
}

export const DebouncedSearchProvider: React.FC<
	DebouncedSearchProviderProps
> = ({ children }) => {
  // 상태와 디바운스 타이머 설정
	const [query, setQuery] = useState('');
	const [debouncedQuery, setDebouncedQuery] = useState('');

	useEffect(() => {
    // 디바운스 타이머 설정
		const debounceTimer = setTimeout(() => {
			setDebouncedQuery(query);
		}, 350);

    // 컴포넌트가 언마운트될 때 타이머 해제
		return () => {
			clearTimeout(debounceTimer);
		};
	}, [query]);

  // Context 값 성정
	const contextValue: DebouncedSearchContextType = {
		query,
		setQuery,
		debouncedQuery,
	};

	return (
		<DebouncedSearchContext.Provider value={contextValue}>
			{children}
		</DebouncedSearchContext.Provider>
	);
};
