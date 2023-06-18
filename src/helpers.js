import path from 'path';
import { stat } from 'node:fs/promises';

export const parseParams = (args) => {
  const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
  const params = args.match(regex) || [];
  return params.map((arg) => arg.replace(/(^['"]|['"]$)/g, ''));
};

export const resolvePath = (currentPath, pathTo) => {
  const newPath = path.isAbsolute(path.normalize(pathTo))
    ? pathTo
    : path.join(currentPath, pathTo);
  return newPath;
};

export const chkIfDirExists = async (path, throwError = true) => {
  try {
    const result = (await stat(path)).isDirectory();
    return result;
  } catch (err) {
    if (throwError) {
      throw new Error();
    } else {
      return false;
    }
  }
};

export const chkIfFileExists = async (path, throwError = true) => {
  try {
    const result = (await stat(path)).isFile();
    return result;
  } catch (err) {
    if (throwError) {
      throw new Error();
    } else {
      return false;
    }
  }
};
