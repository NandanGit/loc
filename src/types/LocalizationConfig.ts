import { TranslationsJSON } from './Translations';

export interface LocalizationConfig<LanguageCode extends string = string> {
	curLang: LanguageCode;
	defaultLang: LanguageCode;
	languages: TranslationsJSON<LanguageCode>[];
}
