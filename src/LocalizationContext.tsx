import React, { createContext } from 'react';
import { LocalizationConfig } from './types/LocalizationConfig';
import { LocalizationFunction } from './types/LocalizationFunction';

export interface LocalizationContextProps {
	config: LocalizationConfig;
	children: React.ReactNode;
}

export const LocalizationContext =
	createContext<LocalizationFunction<string> | null>(null);

export const LocalizationProvider: React.FC<LocalizationContextProps> = ({
	config,
	children,
}) => {
	const { curLang, defaultLang, languages } = config;
	const defaultLangTranslations = languages.find(
		(lang) => lang['@locale'] === defaultLang
	);
	// Verify if defaultLang is available in the list of languages. If not throw an error.
	if (!defaultLangTranslations) {
		throw new Error(
			`The default language "${defaultLang}" is not available in the list of languages.`
		);
	}
	const langTrans = languages.find((lang) => lang['@locale'] === curLang);
	// Verify if the current language is available in the list of languages. If not use the default language and throw a warning.
	if (langTrans === undefined) {
		console.warn(
			`The current language "${curLang}" is not available in the list of languages. Using the default language "${defaultLang}" instead.`
		);
	}

	const curLangTranslations = langTrans || defaultLangTranslations;

	const locFn: LocalizationFunction<string> = (key) => {
		curLangTranslations;
		const translation =
			curLangTranslations[key] || defaultLangTranslations[key] || '[ERR]';
		if (typeof translation === 'string') return translation;
		let returnString = translation.text;
		for (const placeholder of translation.placeholders) {
			returnString = returnString.replace(
				new RegExp(`{${placeholder}}`, 'g'),
				`\${${placeholder}}`
			);
		}
		const fnTemplate = `(${translation.placeholders.join(
			', '
		)}) => \`${returnString}\``;
		return eval(fnTemplate);
	};

	return (
		<LocalizationContext.Provider value={locFn}>
			{children}
		</LocalizationContext.Provider>
	);
};
