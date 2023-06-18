import path from 'path';

export const goUp = async (currentPath) => {
  return path.resolve(currentPath, '..');
};

export const changeDirectory = async (currentPath, pathTo) => {
  return path.resolve(currentPath, pathTo);
};

export const listDirectoryContents = async (currentPath) => {
  // TODO: Implement the logic to list directory contents
};
