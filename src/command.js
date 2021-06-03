import { spawn } from 'child_process';

async function cmd(command, ...args) {
  const proc = spawn(command, args.filter(x => x));

  return new Promise((res, rej) => {
    proc.stdout.on('data', (data) => {
      res(data.toString());
    });

    proc.stderr.on('data', (data) => {
      rej(data.toString());
    });

    proc.on('error', (error) => {
      rej(error.message);
    });

    // proc.on('close', (code) => {
    //   console.log(`child process exited with code ${code}`);
    // });
  });
}

export default cmd;
