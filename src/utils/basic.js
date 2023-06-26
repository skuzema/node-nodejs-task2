import path from 'node:path';
import { readFile as read, writeFile, rename, mkdir, rm } from 'fs/promises';
import { resolvePath, chkIfDirExists, chkIfFileExists } from '../helpers.js';

export const readFile = async (currentPath, filePath) => {
  const pathToFile = resolvePath(currentPath, filePath);
  await chkIfFileExists(pathToFile);
  const contents = await read(pathToFile, { encoding: 'utf8' });
  console.log(contents);
};

export const createFile = async (currentPath, filePath) => {
  const pathToFile = resolvePath(currentPath, filePath);
  await chkIfDirExists(path.parse(pathToFile).dir);
  await writeFile(pathToFile, '');
};

