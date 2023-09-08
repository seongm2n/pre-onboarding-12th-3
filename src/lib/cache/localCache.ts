import { SickData } from 'sickType';

const cacheName = 'sick-cache';

const localCache = (() => {
	const writeToCache = async (
		key: string,
		data: SickData[],
		EXPIRE_TIME: number = 5 * 60 * 1000
	) => {
		const cache = await caches.open(cacheName);
		const expired = new Date().getTime() + EXPIRE_TIME;

		const request = new Request(key);
		const responseData = {
			data,
			expired,
		};

		const response = new Response(JSON.stringify(responseData));

		cache.put(request, response);
	};

	const readFromCache = async (key: string) => {
		const cache = await caches.open(cacheName);
		const response = await cache.match(key);

		if (!response) return [];

		const responseData = await response.json();
		const now = new Date().getTime();

		if (now > responseData.expired) {
			cache.delete(key);
			return [];
		}

		return responseData.data || [];
	};

	return {
		writeToCache,
		readFromCache,
	};
})();

export default localCache;
