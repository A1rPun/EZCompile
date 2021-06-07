import { spawn } from 'child_process';

async function cmd(command, ...args) {
  console.log('[EZCompile] Running command $', command, ...args);
  const proc = spawn(command, args.filter(x => x));

  return new Promise((res, rej) => {
    proc.stdout.on('data', (data) => {
      process.stdout.write(data.toString());
    });

    proc.stderr.on('data', (data) => {
      rej(data.toString());
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
