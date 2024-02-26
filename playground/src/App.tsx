import { LocalizationProvider } from '@nandn/loc';
import './App.css';
import Header from './components/Header';

function App() {
	return (
		<LocalizationProvider
			config={{
				curLang: 'es',
				defaultLang: 'en',
				languages: [
					{
						'@locale': 'en',
						welcome: 'Welcome to the app!',
						welcomeHome: 'Welcome home!',
						score: {
							text: 'Your score is {score}',
							placeholders: ['score'],
						},
					},
					{
						'@locale': 'es',
						welcome: '¡Bienvenido a la aplicación!',
						score: {
							text: 'Tu puntaje es {score}',
							placeholders: ['score'],
						},
					},
				],
			}}
		>
			<div className='App'>
				<Header />
			</div>
		</LocalizationProvider>
	);
}

export default App;
