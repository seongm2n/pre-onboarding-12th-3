import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface HttpClientInterface {
	fetch(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse>;
}

export class HttpClient implements HttpClientInterface {
	#baseURL: string;

	constructor() {
		this.#baseURL = `http://localhost:4000/`;
	}

	async fetch(
		endpoint: string,
		options: AxiosRequestConfig = {}
	): Promise<AxiosResponse> {
		const response = await axios.get(`${this.#baseURL}${endpoint}`, {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...options.headers,
			},
		});
		console.log('Httpclient.ts', response, `${this.#baseURL}${endpoint}`);
		return response;
	}
}
