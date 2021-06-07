import { basename, extname } from 'path';
import command from './command.js';
import mapping from './mapping.js';

async function main(input) {
  const [fileName, ...commandArgs] = input;

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
    try {
      await command(language, fileName, ...commandArgs);
    } catch (e) {
      process.stderr.write(e);
    }
  } else if (typeof language === 'function') {
    const commands = language(basename(fileName, '.' + extension), commandArgs.join(' '));
    try {

    await commands
      .split(';')
      .map((c) => {
        const [cmd, ...compilerArgs] = c.split(' ');
        return () => command(cmd, ...compilerArgs);
      })
      .reduce((prev, curr) => prev.then(curr), Promise.resolve());
    } catch (e) {
      process.stderr.write(e);
    }
  } else {
    console.log(`No compiler or interpreter found for "${extension}" files`);
  }
}

export default main;
