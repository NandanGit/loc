import { useContext } from 'react';
import { LocalizationContext } from './LocalizationContext';
import { LocalizationFunction } from './types/LocalizationFunction';

const useLocalization = <T>() => {
	const locFn = useContext(LocalizationContext);
	if (!locFn) {
		throw new Error(
			'useLocalization must be used within a LocalizationProvider'
		);
	}
	return locFn as T;
};

export default useLocalization;
