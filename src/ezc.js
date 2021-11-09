import { basename, extname } from 'path';
import command from './command.js';
import mapping from './mapping.js';
import logger from './logger.js';

async function doCommand(cmd, ...args) {
  logger.info('Running command $', cmd, ...args);
  return command(cmd, ...args);
}

async function main(input, flags) {
  const [fileName, ...commandArgs] = input;

  if (!fileName) {
    logger.info(`Please provide a filename`);
    return;
  }
  const extension = flags.lang || extname(fileName).slice(1);

  if (!extension) {
    logger.info(`Please provide a filename with an extension`);
    return;
  }
  const language = mapping[extension];

  try {
    await tryCommand(language, fileName, extension, commandArgs, flags);
  } catch (e) {
    logger.error(`Can't find program "${e?.path}"`, e);
  }
}

async function tryCommand(language, fileName, extension, commandArgs, flags) {
  if (typeof language === 'string') {
    const program = flags['with'] ?? language;
    await doCommand(...program.split(' '), fileName, ...commandArgs);
  } else if (typeof language === 'function') {
    const baseFileName = basename(fileName, '.' + extension);
    const commands = language(baseFileName, commandArgs.join(' '));
    await commands
      .split(';')
      .map((c) => {
        const [cmd, ...compilerArgs] = c.split(' ');
        return () => doCommand(cmd, ...compilerArgs);
      })
      .reduce((prev, curr) => prev.then(curr), Promise.resolve());
  } else {
    logger.info(`No compiler or interpreter found for "${extension}" files`);
  }
}

export default main;
