import fs from 'fs';
import path from 'path';
import { TranslationsJSON } from '../../types/Translations';
import { capitalize } from '../../utils/string';

path.join(__dirname, '../src/locales/en.json');

const genEntity = (
	sourcePath: string,
	destDir: string,
	options?: {
		filename?: string;
		entityType?: 'interface' | 'type';
		entityName?: string;
	}
) => {
	const {
		filename = 'Loc.ts',
		entityType = 'interface',
		entityName = 'Loc',
	} = options || {};
	// filename
	if (!fs.existsSync(sourcePath)) {
		console.error(`File not found: ${sourcePath}`);
		return;
	}
	const translations: TranslationsJSON = JSON.parse(
		fs.readFileSync(sourcePath, 'utf8')
	);

	const interfaceContent = `export ${entityType} ${entityName} ${
		entityType === 'interface' ? '' : '= '
	}{
  ${Object.keys(translations)
		.filter((key) => !(key.startsWith('@') || key.startsWith('$')))
		.map((key) => {
			const value = translations[key];
			if (typeof value === 'string') {
				const docComment = `/** 
   * ${value || ''}
   * No description provided
   */\n  `;
				return docComment + `${key}: string;`;
			}
			const {
				text = '',
				placeholders = [],
				description = 'No description provided',
			} = value || {};
			const docComment = `/** 
   * ${text}
   * ${description}
   */\n  `;
			return (
				docComment +
				(placeholders.length
					? `${key}: (${placeholders
							.map((p) => `${p}: string`)
							.join(', ')}) => string;`
					: `${key}: string;`)
			);
		})
		.join('\n\n  ')}
}`;

	if (!fs.existsSync(destDir)) {
		fs.mkdirSync(destDir, { recursive: true });
	}

	const destPath = path.join(destDir, filename);
	fs.writeFileSync(destPath, interfaceContent, 'utf8');

	console.log(
		`${capitalize(
			entityType
		)} with name '${entityName}' generated at: ${destPath}`
	);
};

export default genEntity;
