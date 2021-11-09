#!/usr/bin/env node
import meow from 'meow';
import ezcompile from './src/ezc.js';

const cli = meow(`
	Usage
	$ ezc <file> <arguments>
	
	Options
	  <file>        Filename of the program
	  <arguments>   Additional arguments
	Examples
	  $ ezc program.js
`,
  {
    importMeta: import.meta,
    flags: {
      help: {
        type: 'boolean',
        alias: 'h',
      },
      lang: {
        type: 'string',
        alias: 'l',
      },
      'with': {
        type: 'string',
        alias: 'w',
      },
    },
  }
);

async function main() {
  await ezcompile(cli.input, cli.flags);
}
main();
