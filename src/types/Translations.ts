export type TranslationsJSON<L extends string = string> = {
	'@locale': L;
	'@version'?: string;
	'@author'?: string;
	'@createdAt'?: string;
	'@modifiedAt'?: string;
	'@description'?: string;

	[key: string]: string | TranslationConfig | undefined;
};

export interface TranslationConfig {
	text: string;
	placeholders?: string[];
	description?: string;
}
