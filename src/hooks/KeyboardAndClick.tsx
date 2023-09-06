import { useEffect, useCallback, RefObject } from 'react';

export function useKeyboardEvent(
	callback: (event: KeyboardEvent) => void,
	eventKey: string
) {
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === eventKey) {
				callback(e);
			}
		},
		[callback, eventKey]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);
}

export function useOutsideClick(
	ref: RefObject<HTMLElement>,
	callback: () => void
) {
	const handleClick = useCallback(
		(e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				callback();
			}
		},
		[ref, callback]
	);

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [handleClick]);
}
