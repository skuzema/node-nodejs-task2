import { createInterface } from 'readline/promises';
import {
  fileOperations,
  hash,
  navigation,
  osInfo,
  compression,
} from './utils/index.js';
import { parseParams } from './helpers.js';
import { MESSAGE } from './constants.js';

export class App {
  constructor(homeDir, params) {
    this._currentPath = homeDir;
    this._user = this._getUserName(params);
  }

  _getUserName(params) {
    const userNameParam = params.find((arg) => arg.startsWith('--username='));
    return userNameParam === undefined || userNameParam === null
      ? 'Anonymous'
      : userNameParam.split('=')[1];
  }

  greet = () => {
    console.log(`Welcome to the File Manager, ${this._user}!`);
  };

  bye = () => {
    console.log(`Thank you for using File Manager, ${this._user}, goodbye!`);
  };

  _validate = async (operation, args) => {
    console.log(
      `_validate: args.length: ${args.length}, operation: ${operation}, args[0]: ${args[0]}, args[1]: ${args[1]}, `
    );
    switch (operation.toLowerCase()) {
      case 'up':
      case 'ls':
      case '.exit':
        if (args.length > 0) {
          return false;
        } else return true;

      case 'cd':
      case 'cat':
      case 'rm':
      case 'os':
      case 'hash':
      case 'cat':
        if (args[0] && args.length === 1) {
          return true;
        } else return false;

      case 'mv':
      case 'cp':
      case 'compress':
      case 'decompress':
        if (args[0] && args[1]) {
          return true;
        } else return false;

      case 'add':
        if (args[0] && args.length === 1) {
          return true;
        } else return false;

      case 'rn':
        if (args[0] && args[1]) {
          return true;
        } else return false;

      default:
        return false;
    }
  };

  _processCommand = async (operation, args) => {
    console.log(`_processCommand: operation: ${operation}, args: ${args}`);
    switch (operation.toLowerCase()) {
      case 'up':
        this._currentPath = await navigation.goUp(this._currentPath);
        break;

      case 'cd':
        this._currentPath = await navigation.changeDirectory(
          this._currentPath,
          args[0]
        );
        break;

      case 'ls':
        navigation.listDirectoryContents(this._currentPath);
        break;

      case 'cat':
        await fileOperations.readFile(args[0]);
        break;

      case 'add':
        fileOperations.createFile(args[0]);
        break;

      case 'rn':
        fileOperations.renameFile(args[0], args[1]);
        break;

      case 'cp':
        await fileOperations.copyFile(args[0], args[1]);
        break;

      case 'mv':
        await fileOperations.moveFile(args[0], args[1]);
        break;

      case 'rm':
        fileOperations.deleteFile(args[0]);
        break;

      case 'os':
        await _processOSCommand(args);
        break;

      case 'hash':
        await hash.calculateHash(args[0]);
        break;

      case 'compress':
        await compression.compressFile(args[0], args[1]);
        break;

      case 'decompress':
        await compression.decompressFile(args[0], args[1]);
        break;

      case '.exit':
        process.exit();
        break;

      default:
        console.log(MESSAGE.invalidInput);
        break;
    }
  };

  _processOSCommand = async (args) => {
    switch (args[0].toLowerCase()) {
      case '--eol':
        osInfo.getEOL();
        break;

      case '--cpus':
        osInfo.getCPUsInfo();
        break;

      case '--homedir':
        osInfo.getHomeDirectory();
        break;

      case '--username':
        osInfo.getCurrentUserName();
        break;

      case '--architecture':
        osInfo.getCPUArchitecture();
        break;

      default:
        console.log(MESSAGE.invalidInput);
        break;
    }
  };

  async start() {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    while (true) {
      const prompt = await rl.question(
        `You are currently in ${this._currentPath}\nPlease enter command:\n`
      );
      const [operation, ...args] = parseParams(prompt);
      console.log(`parseParams: operation: ${operation}, args: ${args}`);
      if (await this._validate(operation, args)) {
        try {
          await this._processCommand(operation, args);
        } catch (err) {
          console.log(err);
          console.log(MESSAGE.operationFailed);
        }
      } else {
        console.log(MESSAGE.invalidInput);
      }
    }
  }
}
