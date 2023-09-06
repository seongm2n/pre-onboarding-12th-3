import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface HttpClientInterface {
	getData(
		endpoint: string,
		options?: AxiosRequestConfig
	): Promise<AxiosResponse>;
}

export class HttpClient implements HttpClientInterface {
	#baseURL: string;

	constructor() {
		this.#baseURL = `http://localhost:4000/`;
	}

	async getData(
		endpoint: string,
		options: AxiosRequestConfig = {}
	): Promise<AxiosResponse> {
		try {
			const response = await axios.get(`${this.#baseURL}${endpoint}`, {
				...options,
				headers: {
					'Content-Type': 'application/json',
					...options.headers,
				},
			});

			return response;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error('Axios Error:', error.message);
				if (error.response) {
					console.error('HTTP Status Code:', error.response.status);
					console.error('Response Data:', error.response.data);
				}
				throw error;
			} else {
				console.error('Unknown Error:', error);
				throw new Error('Unknown Error');
			}
		}
	}
}
