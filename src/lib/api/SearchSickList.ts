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
			const response = await this.httpClient.getData(`sick?query=${query}`);
			const responseData: SickListData = response.data;
			return { response: responseData };
		} catch (error) {
			throw error;
		} finally {
			console.info('calling api');
		}
	}
}
