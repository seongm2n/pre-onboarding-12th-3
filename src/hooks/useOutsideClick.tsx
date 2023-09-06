import { useEffect, useCallback, RefObject, useRef } from 'react';

type OutsideClickHandler = (event: MouseEvent) => void;

interface UseOutsideClickProps {
	ref: RefObject<HTMLElement>;
	handler: OutsideClickHandler;
}

export function useOutsideClick({ ref, handler }: UseOutsideClickProps) {
	const handleClick = useCallback(
		(e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				return handler;
			}
		},
		[ref, handler]
	);

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [handleClick]);
}
