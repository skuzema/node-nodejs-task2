import path from 'path';
import { createInterface } from 'readline/promises';

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

  _resolvePath(p) {
    return path.resolve(this._currentPath, p);
  }

  greet = () => {
    console.log(`Welcome to the File Manager, ${this._user}!`);
  };

  bye = () => {
    console.log(`Thank you for using File Manager, ${this._user}, goodbye!`);
  };

  _processCommand = async (command) => {
    const [operation, ...args] = command.split(' ');

    switch (operation.toLowerCase()) {
      case 'up':
        navigation.goUp();
        break;

      case 'cd':
        navigation.goToDirectory(args[0]);
        break;

      case 'ls':
        navigation.listFilesAndFolders();
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

      default:
        console.log('Invalid command.');
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
        console.log('Invalid OS command.');
        break;
    }
  };

  start = () => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const prompt = () => {
      rl.question(`You are currently in ${this._currentPath}\n`, (command) => {
        _processCommand(command.trim().toLowerCase())
          .then(() => {
            prompt();
          })
          .catch((error) => {
            console.error(error.message);
            prompt();
          });
      });
    };

    prompt();
  };
}
