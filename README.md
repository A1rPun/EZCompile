# EZCompile

:construction: Work in Progress :construction:

A tool to help you compile and run code in any language with one command.
Depends heavily on other compilers to be present.

### Example usage

```
$ ezc helloworld.hs # Haskell
$ ezc helloworld.cs # C#
$ ezc helloworld.js # JavaScript
$ ezc helloworld.jl # Julia
```

### Features
- Detects language based on file extension and picks compiler or interpreter
- Makes compiled languages behave like they are interpreted:
  - Compile program with basic parameters
  - Run program after compilation with optional parameters
  - Remove program and build files from filesystem
- Makes interpreted languages behave the same

### TODO

- Test if compiler/interpreter is present before executing the rest of the commands.
- More languages
- Eso langs anyone?

### Why?

I used to have a convenient `alias` for multiple languages but why have multiple short commands when you can have just one?
Also when testing some code or program you don't want to clean your build files manually.
