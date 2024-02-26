export type LocalizationFunction<K extends string> = (
	key: K
) => string | (() => string);
