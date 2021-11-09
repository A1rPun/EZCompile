const compilerMap = {
  // Interpreted
  awk: 'awk -f',
  clj: 'clojure',
  cr: 'crystal run', // cr: (p, x, a) => `${p ?? 'crystal'} build ${x}.cr;./${x} ${a};rm ${x}`,
  dart: 'dart',
  groovy: 'groovy', // groovy: `groovyc`,
  jl: 'julia',
  js: 'node',
  l: 'pil',
  lua: 'lua', // lua: (p, x, a) => `${p ?? 'luac'} -o ${x} ${x}.lua;lua ${x} ${a};rm ${x}`,
  m: 'octave',
  ml: 'ocaml', // ml: (p, x, a) => `${p ?? 'ocamlc'} -o ${x} ${x}.ml;./${x} ${a};rm ${x}`,
  nim: 'nim c -r',
  php: 'php',
  perl: 'perl',
  pl: 'swipl',
  py: 'python',
  r: 'Rscript',
  rb: 'ruby',
  rkt: 'racket',
  scala: 'scala', // scala: (p, x, a) => `${p ?? 'scalac'} ${x}.scala -d ${x}.jar;scala ${x}.jar ${a};rm ${x}.jar`,
  swift: 'swift', // swift: (p, x, a) => `${p ?? 'swiftc'} ${x}.swift;swift ${x} ${a};rm ${x}`,
  tcl: 'tclsh',
  ts: 'ts-node',
  vim: (p, x, a) => `${p ?? 'vim'} ${x}.vim -c ":so % | call getchar() | :q"`, // TODO: impossible?
  // Compiled
  adb: (p, x, a) => `${p ?? 'gnatmake'} ${x}.adb;./${x} ${a};rm ${x}`,
  c: (p, x, a) => `${p ?? 'gcc'} -o ${x} ${x}.c;./${x} ${a};rm ${x}`,
  cob: (p, x, a) => `${p ?? 'cobc'} -x -W -free ${x}.cob;./${x} ${a};rm ${x}`,
  cpp: (p, x, a) => `${p ?? 'g'}++ -o ${x} ${x}.cpp;./${x} ${a};rm ${x}`,
  cs: (p, x, a) => `${p ?? 'mcs'} ${x}.cs;./${x}.exe ${a};rm ${x}.exe`,
  d: (p, x, a) => `${p ?? 'dmd'} ${x}.d;./${x} ${a};rm ${x}.o ${x}`,
  erl: 'erlc',
  ex: 'elixirc',
  f95: (p, x, a) => `${p ?? 'gfortran'} -o ${x} ${x}.f95;./${x} ${a};rm ${x}`,
  fs: (p, x, a) => `${p ?? 'fsharpc'} ${x}.fs;./${x}.exe ${a};rm ${x}.exe`, // rm FSharp.Core.dll
  go: 'go run', // go: 'go build',
  hs: (p, x, a) => `${p ?? 'ghc'} -o ${x} ${x}.hs;./${x} ${a};rm ${x}.o ${x}.hi ${x}`,
  java: (p, x, a) => `${p ?? 'javac'} ${x}.java;java ${x} ${a};rm ${x}.class`,
  kt: (p, x, a) => `${p ?? 'kotlinc'} ${x}.kt -include-runtime -d ${x}.jar;java -jar ${x}.jar ${a};rm ${x}.jar`,
  // lisp: (p, x, a) => `${p ?? 'sbcl'} --non-interactive --eval '(compile-file "${x}.lisp")'`, //TODO: Error, unhandled condition
  lisp: (p, x, a) => `${p ?? 'sbcl'} --script ${x}.lisp ${a}`,
  pas: (p, x, a) => `${p ?? 'fpc'} ${x}.pas;./${x} ${a};rm ${x}.o ${x}`,
  rs: (p, x, a) => `${p ?? 'rustc'} ${x}.rs;./${x} ${a};rm ${x}`,
  s: (p, x, a) => `${p ?? 'as'} -o ${x}.o ${x}.s;ld -o ${x} ${x}.o;rm ${x}.o;./${x} ${a};rm ${x}`,
  sml: (p, x, a) => `${p ?? 'mlton'} ${x}.sml;./${x} ${a};rm ${x}`,
  st: (p, x, a) => `${p ?? 'gst'} ${x}.st${a ? ` -a ${a}` : ''}`,
  vb: (p, x, a) => `${p ?? 'vbnc'} ${x}.vb;chmod +x ./${x}.exe;./${x}.exe ${a};rm ${x}.exe`,
  wat: (p, x, a) => `${p ?? 'wat2wasm'} -o ${x}.wasm ${x}.wat`, // TODO: Run from node?
};

export default compilerMap;

/*
{
\ "ahk": "autohotkey",
\ "applescript": "osascript",
\ "autoit": "autoit3",
\ "bat": "cmd /c",
\ "clojure": "lein exec",
\ "coffeescript": "coffee",
\ "csharp": "scriptcs",
\ "gnuplot": "gnuplot -p",
\ "haxe": "haxe --cwd $dirWithoutTrailingSlash --run $fileNameWithoutExt",
\ "kit": "kitc --run",
\ "less": "cd $dir && lessc $fileName $fileNameWithoutExt.css",
\ "objective-c": "cd $dir && gcc -framework Cocoa $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
\ "powershell": "powershell -ExecutionPolicy ByPass -File",
\ "sass": "sass --style expanded",
\ "scheme": "csi -script",
\ "scss": "scss --style expanded",
\ "sh": "sh",
\ "v": "v run",
\ "vbscript": "cscript //Nologo",
\ "zsh": "zsh",
\}
*/
