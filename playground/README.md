#@nandn/loc
A lightweight localisation library for React.

Features:

- `LocalisationProvider` to provide localisation context to the app. This wraps the entire application and provides the localisation context to all the components. This accepts a config object to configure the localisation. The config object should have the following properties:

  - `defaultLang`: The default language to use if no language is provided.
  - `curLang`: The current language to use. This can be changed using the `changeLang` method provided by the `LocalisationContext`.
  - `languages`: An array of languages you intend to support in your app.

    ```javascript
    [
    	{
    		'@locale': 'en',
    		homePageTitle: 'Home Page',
    		homePageContent: 'This is the home page content',
    		homePageGreeting: {
    			text: 'Hello, {name}!',
    			placeholders: ['name'],
    		},
    		homePageButton: 'Click me',
    	},
    	{
    		'@locale': 'te',
    		homePageTitle: 'హోమ్ పేజీ',
    		homePageContent: 'ఇది హోమ్ పేజీ కంటెంట్',
    		homePageGreeting: {
    			text: 'నమస్కారం, {name}!',
    			placeholders: ['name'],
    		},
    		homePageButton: 'దీనిని నొక్కండి',
    	},
    	// ... and more languages
    ];

    // You can also load these languages from a JSON file and pass it to the `LocalisationProvider` component through `languages` property in `config` prop.
    ```

    > The `@locale` property is a special property that is used to identify the language. This is used to identify the language in the `curLang` property of the `LocalisationProvider` component.

- `useLocalisation` hook to get the localised strings and the `changeLang` method to change the language. `useLocalisation` returns an object with the following properties:
  - `changeLang`: A method to change the language.
  - `curLang`: The current language.
  - `loc`: The localised strings for the current language.
    ```javascript
    const { changeLang, curLang, loc } = useLocalisation();
    ```
- A CLI tool to generate TypeScript types and interfaces from the localisation JSON files.

  ```bash
  loc gen-interface <interface_name> -i path/to/locales.json -o path/to/output/dir
  ```

  This will generate a `<interface_name>.ts` file in the current directory. This file will contain the following interface:

  ```typescript
  export interface <interface_name> {
  	homePageTitle: string;
  	homePageContent: string;
  	homePageGreeting: (name: string) => string;
  	homePageButton: string;
    // ... and more definitions
  };
  ```

  > Just replace `gen-interface` in the command with `gen-type` to generate a type instead of an interface.

  You can then use this types and interfaces in your TypeScript code to get type safety and intellisense support.

## Installation

```bash
npm install @nandn/loc
```

## Usage

```javascript
import React from 'react';
import {
	LocalisationProvider,
	useLocalisation,
	TranslationsJSON,
} from '@nandn/loc';

import enTranslations from 'path/to/en/translations.json';
import teTranslations from 'path/to/te/translations.json';

const en: TranslationsJSON = enTranslations;
const te: TranslationsJSON = teTranslations;

const App = () => {
	return (
		<LocalisationProvider
			config={{
				defaultLang: 'en',
				curLang: 'en',
				languages: [en, te],
			}}
		>
			<MyComponent />
		</LocalisationProvider>
	);
};

const MyComponent = () => {
	const { changeLang, curLang, loc } = useLocalisation();

	return (
		<div>
			<h1>{loc.homePageTitle}</h1>
			<p>{loc.homePageContent}</p>
			<button>{loc.homePageButton}</button>
			<p>{loc.homePageGreeting('John')}</p>
			<button onClick={() => changeLang(curLang === 'en' ? 'te' : 'en')}>
				{curLang === 'en' ? 'తెలుగు' : 'English'}
			</button>
		</div>
	);
};
```

> [!Note]
> If you want autocompletion and type safety for the localised strings, you can use the CLI tool to generate TypeScript types and interfaces from the localisation JSON files.
> Follow these steps to generate the types and interfaces:
>
> 1. Create a JSON file with the localisation strings.
> 2. Add this script to your `package.json` file:
>    ```json
>    // package.json
>    {
>    	// ...
>    	"scripts": {
>    		// ...
>    		"gen-interface": "loc gen-interface <interface_name> -i path/to/locales.json -o path/to/output/dir"
>    	}
>    	// ...
>    }
>    ```
> 3. Run the following command to generate the types and interfaces:
>    ```bash
>    npm run gen-interface
>    ```
> 4. Use the generated types and interfaces in your TypeScript code to get type safety and intellisense support.
> 5. You can also use the `gen-type` command to generate a type instead of an interface.
> 6. Anytime you update the localisation JSON file, you can run the `gen-interface` command to update the types and interfaces. You can write a script to run this command automatically when the JSON file changes. (that feature is not provided by the library. If you are interested in this feature, you can create an issue in the GitHub repo of this project.)
