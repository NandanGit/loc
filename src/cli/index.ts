#!/usr/bin/env node

import { Command } from 'commander';
import genEntity from './generators/genEntity';

const program = new Command();

program
	.command('gen-interface <interfaceName>')
	.option('-i, --input <input>', 'Input file path')
	.option('-o, --output <output>', 'Output directory')
	.action(
		(
			interfaceName: string,
			options: {
				input: string;
				output: string;
			}
		) => {
			// input is the input file path
			// output is the output directory
			genEntity(options.input, options.output, {
				filename: `${interfaceName}.ts`,
				entityType: 'interface',
				entityName: interfaceName,
			});
		}
	);

program
	.command('gen-type <typeName>')
	.option('-i, --input <input>', 'Input file path')
	.option('-o, --output <output>', 'Output directory')
	.action(
		(
			typeName: string,
			options: {
				input: string;
				output: string;
			}
		) => {
			// input is the input file path
			// output is the output directory
			genEntity(options.input, options.output, {
				filename: `${typeName}.ts`,
				entityType: 'type',
				entityName: typeName,
			});
		}
	);

program.parse(process.argv);
