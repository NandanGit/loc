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
	placeholders: string[];
	// placeholders: {
	// 	[key: string]: {
	// 		type: 'string'; // | 'number' | 'bool';
	// 	};
	// };
}

// const translations: TranslationsJSON<'en' | 'te'> = {
// 	'@locale': 'en',
// 	hello: {
// 		text: 'Hello {name}',
// 		placeholders: {
// 			name: {
// 				type: 'string',
// 			},
// 		},
// 	},
// };
// translations;
