#!/usr/bin/env node

import { Command } from 'commander';
import genInterface from './generators/genInterface';

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
			genInterface(
				options.input,
				options.output,
				`${interfaceName}.ts`,
				interfaceName
			);
		}
	);

program.parse(process.argv);
