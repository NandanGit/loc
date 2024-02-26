import { useContext } from 'react';
import { LocalizationContext } from './LocalizationContext';

const useLocalization = () => {
	const loc = useContext(LocalizationContext);
	if (!loc) {
		throw new Error(
			'useLocalization must be used within a LocalizationProvider'
		);
	}
	return loc;
};

export default useLocalization;
