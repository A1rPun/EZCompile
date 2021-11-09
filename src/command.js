import { spawn } from 'child_process';
import logger from './logger.js';

async function cmd(command, ...args) {
  const proc = spawn(command, args.filter(x => x));

  return new Promise((res, rej) => {
    proc.stdout.on('data', (data) => {
      logger.info('stdout');
      console.log(data.toString());
    });

    proc.stderr.on('data', async (data) => {
      logger.error('stderr');
      console.log(data.toString());
    });

    proc.on('error', (error) => {
      rej(error);
    });
    
    proc.on('exit', (code) => {
      res(code);
    });
  });
}

export default cmd;
