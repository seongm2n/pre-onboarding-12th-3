import { useEffect, useState } from 'react';

function useKeyPress<T extends string>(targetKey: T) {
	// 키 상태를 저장할 상태 변수
	const [keyPressed, setKeyPressed] = useState<boolean>(false);

	// 키가 눌렸을 때 실행되는 이벤트 핸들러 함수
	function downHandler({ key }: KeyboardEvent) {
		if (targetKey.includes(key)) {
			setKeyPressed(true);
		}
	}

	// 키가 떼졌을 때 실행되는 이벤트 핸들러 함수
	const upHandler = ({ key }: KeyboardEvent) => {
		if (targetKey.includes(key)) {
			setKeyPressed(false);
		}
	};

	// 컴포넌트가 마운트될 때 이벤트 리스너 추가
	useEffect(() => {
		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);

		// 컴포넌트가 언마운트될 때 이벤트 리스너 제거
		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
	}, []);

	return keyPressed;
}

export default useKeyPress;
