import { TranslationsJSON } from './Translations';

export interface LocalizationConfig<LanguageCode extends string = string> {
	curLang: LanguageCode;
	defaultLang: LanguageCode;
	languages: TranslationsJSON[];
}

// const config: LocalizationConfig<'en' | 'te'> = {
// 	curLang: 'en',
// 	defaultLang: 'en',
// 	languages: [
// 		{
// 			'@locale': 'en',
// 			hello: 'Hello',
// 		},
// 	],
// };
// config;
