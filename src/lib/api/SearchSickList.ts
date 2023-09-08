import { HttpClient } from './HttpClient';
import { SickListData } from 'sickType';
import localCache from '../cache/localCache';

export interface GetSickListResponseType {
	response: SickListData;
}

export class SearchSickList {
	private readonly httpClient: HttpClient;

	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient;
	}

	async getSickList(
		query: string,
		cacheResponse: boolean
	): Promise<GetSickListResponseType> {
		try {
			if (cacheResponse) {
				// 캐시 사용 시 로컬 캐시에서 데이터를 읽어옴
				const cachedData = await localCache.readFromCache(query);
				if (cachedData) {
					return { response: cachedData };
				}
			}

			// 캐시가 없거나 캐시 사용이 비활성화된 경우 API 호출
			const response = await this.httpClient.getData(`sick?query=${query}`);
			console.log('calling api');
			const responseData: SickListData = response.data;

			// API 응답을 캐시에 저장
			localCache.writeToCache(query, responseData);
			return { response: responseData };
		} catch (error) {
			throw error;
		} 
	}
}
