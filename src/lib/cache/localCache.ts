import { SickData } from 'sickType';

const localCache = (() => {
	const writeToCache = (key: string, data: SickData[]) => {
		const timestampInMinutes = Math.floor(new Date().getMinutes());
		const storageValue = {
			data,
			timestamp: timestampInMinutes,
		};

		localStorage.setItem(key, JSON.stringify(storageValue));
	};

	const readFromCache = (key: string) => {
		const storageValueString = localStorage.getItem(key);
		if (!storageValueString) return [];

		const storageValue = JSON.parse(storageValueString);

		if (new Date().getMinutes() - storageValue.timestampInMinutes > EXPIRE_TIME) {
			localStorage.removeItem(key);
			return [];
		}

		return storageValue.recommendations || [];
	};

	return {
		writeToCache,
		readFromCache,
	};
})();

export default localCache;

const EXPIRE_TIME = 5 * 60 * 1000; // 5분
