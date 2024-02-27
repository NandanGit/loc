// const fs = require('fs');
// const path = require('path');
import { TranslationsJSON } from '@nandn/loc/dist/types/Translations';
import fs from 'fs';
import path from 'path';

path.join(__dirname, '../src/locales/en.json');

const genTransTypes = (
	sourcePath: string,
	destDir: string,
	filename = 'Loc.ts',
	interfaceName = 'Loc'
) => {
	if (!fs.existsSync(sourcePath)) {
		console.error(`File not found: ${sourcePath}`);
		return;
	}
	const translations: TranslationsJSON = JSON.parse(
		fs.readFileSync(sourcePath, 'utf8')
	);
	console.log('translations:', translations);

	const interfaceContent = `export interface ${interfaceName} {
  ${Object.keys(translations)
		.filter((key) => !key.startsWith('@'))
		.map((key) => {
			const value = translations[key];
			if (typeof value === 'string') {
				const docComment = `/** 
   * ${value || ''}
   */\n  `;
				return docComment + `${key}: string;`;
			}
			const docComment = `/** 
   * ${value?.text || ''}
   */\n  `;
			return (
				docComment +
				`${key}: (${value?.placeholders
					.map((p) => `${p}: string`)
					.join(', ')}) => string;`
			);
		})
		.join('\n\n  ')}
}`;
	console.log('interfaceContent:', interfaceContent);

	if (!fs.existsSync(destDir)) {
		fs.mkdirSync(destDir, { recursive: true });
	}

	const destPath = path.join(destDir, filename);
	fs.writeFileSync(destPath, interfaceContent, 'utf8');
};

genTransTypes(
	path.join(__dirname, './resources/en.json'),
	path.join(__dirname, './outputs/')
);
