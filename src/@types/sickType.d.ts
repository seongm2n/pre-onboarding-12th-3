declare module 'sickType' {
	type SickData = {
		sickCd: string;
		sickNm: string;
	};

	type SickListData = SickData[];

	type KeywordQueryData = {
		query: string;
		useCache?: boolean;
	};
}
