import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { resolvePath, chkIfFileExists } from '../helpers.js';

export const calculateHash = async (currentPath, filePath) => {
  const sourceFile = resolvePath(currentPath, filePath);
  await chkIfFileExists(sourceFile);
  const content = await readFile(sourceFile);
  const data = createHash('sha256').update(content).digest('hex');
  console.log(data);
};
