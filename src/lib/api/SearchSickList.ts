import { HttpClient } from './HttpClient';
import { SickListData } from 'sickType';

export interface GetSickListResponseType {
	response: SickListData;
}

export class SearchSickList {
	private callingCnt: number;
	private readonly httpClient: HttpClient;

	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient;
		this.callingCnt = 0;
	}

	async getSickList(query: string): Promise<GetSickListResponseType> {
		this.callingCnt++;
		try {
			const response = await this.httpClient.fetch(`sick?query=${query}`);
			const responseData: SickListData = response.data;
			console.log('SearchSickList.ts에서 데이터 잘 받아지나??', responseData);
			return { response: responseData };
		} catch (error) {
			throw error;
		} finally {
			console.info('API 호출 중, 호출 횟수 : ', this.callingCnt);
		}
	}
}
