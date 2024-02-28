// import useLocalization from '../../../src/useLocalization';

import { useLocalization } from '@nandn/loc';
import useLoc from '../hooks/useLoc';

const Header: React.FC = () => {
	const { changeLang } = useLocalization();
	const loc = useLoc();
	return (
		<header className='App-header'>
			<button onClick={() => changeLang('en')}>{loc.headerEnglish}</button>
			<button onClick={() => changeLang('es')}>{loc.headerSpanish}</button>
			<button onClick={() => changeLang('fr')}>{loc.headerFrench}</button>
		</header>
	);
};

export default Header;
