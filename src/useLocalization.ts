import { useContext } from 'react';
import { LocalizationContext } from './LocalizationContext';

const useLocalization = <T>() => {
	const loc = useContext(LocalizationContext);
	if (!loc) {
		throw new Error(
			'useLocalization must be used within a LocalizationProvider'
		);
	}
	return loc as T;
};

export default useLocalization;
