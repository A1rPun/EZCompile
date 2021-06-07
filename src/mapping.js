const compilerMap = {
  // Interpreted
  awk: 'awk -f',
  clj: 'clojure',
  cr: 'crystal run', // cr: (x, a) => `crystal build ${x}.cr;./${x} ${a};rm ${x}`,
  dart: 'dart',
  groovy: 'groovy', // groovy: `groovyc`,
  jl: 'julia',
  js: 'node',
  l: 'picolisp',
  lua: 'lua', // lua: (x, a) => `luac -o ${x} ${x}.lua;lua ${x} ${a};rm ${x}`,
  m: 'octave',
  ml: 'ocaml', // ml: (x, a) => `ocamlc -o ${x} ${x}.ml;./${x} ${a};rm ${x}`,
  nim: 'nim c -r', // TODO: ERROR
  php: 'php',
  pl: 'perl',
  py: 'python',
  r: 'Rscript',
  rb: 'ruby',
  rkt: 'racket',
  scala: 'scala', // scala: (x, a) => `scalac ${x}.scala -d ${x}.jar;scala ${x}.jar ${a};rm ${x}.jar`,
  swift: 'swift', // swift: (x, a) => `swiftc ${x}.swift;swift ${x} ${a};rm ${x}`,
  ts: 'ts-node',
  // Compiled
  adb: (x, a) => `gnatmake ${x}.adb;./${x} ${a};rm ${x}`,
  c: (x, a) => `gcc -o ${x} ${x}.c;./${x} ${a};rm ${x}`,
  cob: (x, a) => `cobc -x -W -free ${x}.cob;./${x} ${a};rm ${x}`,
  cpp: (x, a) => `g++ -o ${x} ${x}.cpp;./${x} ${a};rm ${x}`,
  cs: (x, a) => `mcs ${x}.cs;./${x}.exe ${a};rm ${x}.exe`,
  d: (x, a) => `dmd ${x}.d;./${x} ${a};rm ${x}.o ${x}`,
  erl: 'erlc',
  ex: 'elixirc',
  f95: (x, a) => `gfortran -o ${x} ${x}.f95;./${x} ${a};rm ${x}`,
  fs: (x, a) => `fsharpc ${x}.fs;./${x}.exe ${a};rm ${x}.exe`, // rm FSharp.Core.dll
  go: 'go run', // go: 'go build', // TODO: ERROR
  hs: (x, a) => `ghc -o ${x} ${x}.hs;./${x} ${a};rm ${x}.o ${x}.hi ${x}`,
  java: (x, a) => `javac ${x}.java;java ${x} ${a};rm ${x}.class`,
  kt: (x, a) => `kotlinc ${x}.kt -include-runtime -d ${x}.jar;java -jar ${x}.jar ${a};rm ${x}.jar`,
  lisp: (x, a) => `sbcl --non-interactive --eval '(compile-file "${x}.lisp")'`, //TODO: Error, unhandled condition
  pas: (x, a) => `fpc ${x}.pas;./${x} ${a};rm ${x}.o ${x}`,
  rs: (x, a) => `rustc ${x}.rs;./${x} ${a};rm ${x}`,
  s: (x, a) => `as -o ${x}.o ${x}.s;ld -o ${x} ${x}.o;rm ${x}.o;./${x} ${a};rm ${x}`,
  sml: (x, a) => `mlton ${x}.sml;./${x} ${a};rm ${x}`,
  st: (x, a) => `gst ${x}.st${a ? ` -a ${a}` : ''}`,
  vb: (x, a) => `vbnc ${x}.vb;chmod +x ./${x}.exe;./${x}.exe ${a};rm ${x}.exe`,
  wat: (x, a) => `wat2wasm -o ${x}.wasm ${x}.wat`, // TODO: Run from node?
};

export default compilerMap;
