import { basename, extname } from 'path';
import command from './command.js';
import mapping from './mapping.js';

async function runCommand(...args) {
  const output = await command(...args);
  process.stdout.write(output);
}

async function main(input, options) {
  const [fileName, ...args] = input;

  if (!fileName) {
    console.log(`Please provide a filename`);
    return;
  }
  const extension = extname(fileName).slice(1);

  if (!extension) {
    console.log(`Please provide a filename with an extension`);
    return;
  }
  const language = mapping[extension];

  if (typeof language === 'string') {
    await runCommand(language, fileName, ...args);
  } else if (typeof language === 'function') {
    const commands = language(basename(fileName, '.' + extension));
    commands.split(';').forEach(async c => {
      const [cmd, ...argss] = c.split(' ');
      await runCommand(cmd, ...argss, ...args);
    });
  } else {
    console.log(`No compiler or interpreter found for "${extension}" files`);
  }
}

export default main;
