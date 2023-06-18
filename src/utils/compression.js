import path from 'node:path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { resolvePath, chkIfDirExists, chkIfFileExists } from '../helpers.js';

export const compressFile = async (currentPath, filePath, destinationPath) => {
  const sourceFilePath = resolvePath(currentPath, filePath);
  const destFilePath = resolvePath(currentPath, destinationPath);
  await chkIfFileExists(sourceFilePath);
  if (!(await chkIfDirExists(path.parse(destFilePath).dir, false))) {
    await mkdir(path.parse(destFilePath).dir);
  }
  const readStream = createReadStream(sourceFilePath);
  const writeStream = createWriteStream(destFilePath);
  await pipeline(readStream, createBrotliCompress(), writeStream);
};

export const decompressFile = async (
  currentPath,
  filePath,
  destinationPath
) => {
  const sourceFilePath = resolvePath(currentPath, filePath);
  const destFilePath = resolvePath(currentPath, destinationPath);
  await chkIfFileExists(sourceFilePath);
  if (!(await chkIfDirExists(path.parse(destFilePath).dir, false))) {
    await mkdir(path.parse(destFilePath).dir);
  }
  const readStream = createReadStream(sourceFilePath);
  const writeStream = createWriteStream(destFilePath);
  await pipeline(readStream, createBrotliDecompress(), writeStream);
};
