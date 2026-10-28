# CRAFTY

## About The Project

A fork of [Craft-Academy/crafty](https://github.com/Craft-Academy/crafty), a Twitter-like command-line application used as a clean-architecture and test-driven development exercise. This repository holds my implementation.

The CLI (`crafty`) lets a user post a message, edit a message and view a timeline. The code is split into `domain`, `application` (use cases) and `infrastructure` (a file system message repository), with tests in `src/tests`.

### Built With

- TypeScript and Node.js
- [Commander](https://github.com/tj/commander.js)
- Jest
- Biome and esbuild

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```sh
npm install
npm run build   # type-check and bundle to dist/index.js
```

## Usage

```sh
node dist/index.js post <user> <message>
node dist/index.js edit <user> <id> <message>
node dist/index.js view <author>
```

## License

No license file is present in this repository. `package.json` declares the ISC license.

## Contact

Dyrits - https://github.com/Dyrits
