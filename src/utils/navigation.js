import path from 'path';
import { readdir } from 'node:fs/promises';
import { chkIfDirExists } from '../helpers.js';

export const goUp = async (currentPath) => {
  return path.resolve(currentPath, '..');
};

export const changeDirectory = async (currentPath, pathTo) => {
  const newPath = path.isAbsolute(path.normalize(pathTo))
    ? pathTo
    : path.join(currentPath, pathTo);
  await chkIfDirExists(newPath);
  return newPath;
};

export const listDirectoryContents = async (currentPath) => {
  const files = await readdir(currentPath, { withFileTypes: true });
  const fileList = files
    .map((value) =>
      value.isFile() || value.isDirectory()
        ? { Name: value.name, Type: value.isFile() ? 'file' : 'directory' }
        : null
    )
    .filter((elements) => {
      return elements !== null;
    })
    .sort((a, b) => {
      if (a.Type < b.Type) {
        return -1;
      }
      if (a.Type > b.Type) {
        return 1;
      }
      return 0;
    });
  console.table(fileList);
};
