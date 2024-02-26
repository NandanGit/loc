// import useLocalization from '../../../src/useLocalization';

import { useLocalization } from '@nandn/loc';

const Header: React.FC = () => {
	const { loc, changeLang } = useLocalization();
	console.log(loc.welcome);
	return (
		<header className='App-header'>
			<p>
				Edit <code>src/App.tsx</code> and save to reload.
			</p>
			<a
				className='App-link'
				href='https://reactjs.org'
				target='_blank'
				rel='noopener noreferrer'
			>
				Learn React
			</a>
			<button onClick={() => changeLang('en')}>Switch</button>
		</header>
	);
};

export default Header;
