import path from 'node:path';
import {
  readFile as read,
  writeFile,
  rename,
  copyFile as copy,
  mkdir,
  rm,
} from 'fs/promises';
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

export const renameFile = async (currentPath, filePath, newFileName) => {
  const pathToFile = resolvePath(currentPath, filePath);
  const pathToNewFile = resolvePath(currentPath, newFileName);
  await chkIfFileExists(pathToFile);
  await chkIfDirExists(path.parse(pathToNewFile).dir);
  await rename(pathToFile, pathToNewFile);
};

export const copyFile = async (currentPath, filePath, destinationPath) => {
  const sourceFilePath = resolvePath(currentPath, filePath);
  const destPath = resolvePath(currentPath, destinationPath);
  const destFilePath = path.join(destPath, path.parse(sourceFilePath).base);
  await chkIfFileExists(sourceFilePath);
  if (!(await chkIfDirExists(destPath, false))) {
    await mkdir(destPath);
  }
  await copy(sourceFilePath, destFilePath);
};

export const moveFile = async (currentPath, filePath, destinationPath) => {
  await copyFile(currentPath, filePath, destinationPath);
  await deleteFile(currentPath, filePath);
};

export const deleteFile = async (currentPath, filePath) => {
  const pathToFile = resolvePath(currentPath, filePath);
  await chkIfFileExists(pathToFile);
  await rm(pathToFile);
};
