import fs from 'fs';
import { promisify } from 'util';

export const checkIfFileOrDirectoryExists = (path: string): boolean => {
  return fs?.existsSync(path);
};

export const getFile = async (
  path: string,
  encoding: any,
): Promise<string | Buffer> => {
  const readFile = promisify(fs.readFile);

  if (encoding) {
    return readFile(path, encoding);
  } else {
    return readFile(path, {});
  }
};

export const createFile = async (
  path: string,
  fileName: string,
  data: string,
): Promise<void> => {
  // if (!checkIfFileOrDirectoryExists(path)) {
  //   fs.mkdirSync(path);
  // }
  const writeFile = promisify(fs.writeFile);
  return await writeFile(`${path}/${fileName}`, data, 'utf8');
};

export const deleteFile = async (path: string): Promise<void> => {
  const unlink = promisify(fs.unlink);

  return await unlink(path);
};
