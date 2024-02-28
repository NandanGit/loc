import { LocalizationProvider } from '@nandn/loc';
// import { LocalizationProvider } from '../../src/LocalizationContext';
import './App.css';
import Header from './components/Header';
import { Body } from './components/Body';

import enTrans from './assets/l10n/en.json';
import esTrans from './assets/l10n/es.json';
import frTrans from './assets/l10n/fr.json';

function App() {
	// console.log('enTrans:', enTrans);
	// console.log('esTrans:', esTrans);
	// console.log('frTrans:', frTrans);
	return (
		<LocalizationProvider
			config={{
				curLang: 'en',
				defaultLang: 'en',
				languages: [enTrans, esTrans, frTrans],
			}}
		>
			<Header />
			<br />
			<Body />
		</LocalizationProvider>
	);
}

export default App;
