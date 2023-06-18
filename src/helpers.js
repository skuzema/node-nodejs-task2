import { stat } from 'node:fs/promises';

export const chkIfDirExists = async (path) => {
  if (!(await stat(path)).isDirectory()) {
    throw new Error();
  }
};

export const chkIfFileExists = async (path) => {
  if (!(await stat(path)).isFile()) {
    throw new Error();
  }
};

export const parseParams = (args) => {
  const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
  const params = args.match(regex) || [];
  return params.map((arg) => arg.replace(/(^['"]|['"]$)/g, ''));
};
