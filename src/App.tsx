import React from 'react';
import { Outlet } from 'react-router-dom';
import { DebouncedSearchProvider } from './context/DebouncedSearchContext';

const App: React.FC = () => {
	return (
		<DebouncedSearchProvider>
			<Outlet />
		</DebouncedSearchProvider>
	);
};

export default App;
