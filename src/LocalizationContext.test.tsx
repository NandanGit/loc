// FILEPATH: /Users/nandan/Nandu/Programming/OwnProjects/npmPackages/nandn/loc/src/LocalizationContext.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { LocalizationProvider } from './LocalizationContext';

describe('LocalizationProvider', () => {
	it('renders children when passed in', () => {
		const { container } = render(
			<LocalizationProvider
				config={{
					curLang: 'en',
					defaultLang: 'en',
					languages: [{ '@locale': 'en', hello: 'Hello' }],
				}}
			>
				<div>Test Child</div>
			</LocalizationProvider>
		);

		expect(container.textContent).toMatch('Test Child');
	});

	it('throws an error when default language is not in the list', () => {
		expect(() =>
			render(
				<LocalizationProvider
					config={{
						curLang: 'en',
						defaultLang: 'en',
						languages: [{ '@locale': 'fr', hello: 'Bonjour' }],
					}}
				>
					<div>Test Child</div>
				</LocalizationProvider>
			)
		).toThrow(
			`The default language "en" is not available in the list of languages.`
		);
	});

	it('shows a warning when current language is not in the list', () => {
		console.warn = jest.fn();

		render(
			<LocalizationProvider
				config={{
					curLang: 'en',
					defaultLang: 'fr',
					languages: [{ '@locale': 'fr', hello: 'Bonjour' }],
				}}
			>
				<div>Test Child</div>
			</LocalizationProvider>
		);

		expect(console.warn).toHaveBeenCalledWith(
			`The current language "en" is not available in the list of languages. Using the default language "fr" instead.`
		);
	});

	// Add more tests as needed...
});
