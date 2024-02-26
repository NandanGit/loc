import React, { createContext, useState } from 'react';
import { LocalizationConfig } from './types/LocalizationConfig';

export interface LocalizationContextProps {
	config: LocalizationConfig;
	children: React.ReactNode;
}

export const LocalizationContext = createContext<{
	loc: { [key: string]: string | ((...args: any[]) => string) };
	changeLang: (lang: string) => void;
	curLang: string;
} | null>(null);

export const LocalizationProvider: React.FC<LocalizationContextProps> = ({
	config,
	children,
}) => {
	const { curLang, defaultLang, languages } = config;
	const [lang, setLang] = useState(curLang);
	const defaultLangTranslations = languages.find(
		(language) => language['@locale'] === defaultLang
	);
	// console.log('defaultLangTranslations:', defaultLangTranslations);
	// Verify if defaultLang is available in the list of languages. If not throw an error.
	if (!defaultLangTranslations) {
		throw new Error(
			`The default language "${defaultLang}" is not available in the list of languages.`
		);
	}

	let currentLangTranslations = languages.find(
		(language) => language['@locale'] === lang
	);
	// console.log('currentLangTranslations:', currentLangTranslations);
	// Verify if the current language is available in the list of languages. If not use the default language and throw a warning.
	if (currentLangTranslations === undefined) {
		console.warn(
			`The current language "${lang}" is not available in the list of languages. Using the default language "${defaultLang}" instead.`
		);
		currentLangTranslations = defaultLangTranslations;
	}

	const finalTranslations: {
		[key: string]: string | ((...args: any[]) => string);
	} = {};
	for (const key in defaultLangTranslations) {
		const translation =
			currentLangTranslations[key] || defaultLangTranslations[key] || '[ERR]';
		if (typeof translation === 'string') {
			finalTranslations[key] = translation;
			continue;
		}
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
		finalTranslations[key] = eval(fnTemplate);
	}

	// console.log('finalTranslations:', finalTranslations);

	return (
		<LocalizationContext.Provider
			value={{
				loc: finalTranslations,
				changeLang: setLang,
				curLang: lang,
			}}
		>
			{children}
		</LocalizationContext.Provider>
	);
};
