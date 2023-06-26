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
  const result = (await stat(path)).isDirectory();
  if (!result && throwError) {
    throw new Error();
  }
  return result;
};

export const chkIfFileExists = async (path, throwError = true) => {
  const result = (await stat(path)).isFile();
  if (!result && throwError) {
    throw new Error();
  }
  return result;
};
