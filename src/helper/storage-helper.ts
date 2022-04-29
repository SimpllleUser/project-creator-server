// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { promisify } = require('util');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fse = require('fs-extra');

export const checkIfFileOrDirectoryExists = (path: string): boolean => {
  return fs.existsSync(path);
};

export const getFile = async (
  path: string,
  encoding: string,
): Promise<string | Buffer> => {
  const readFile = promisify(fs.readFile);
  const encode = encoding || {};
  return readFile(path, encode);
};

export const createFile = async (
  path: string,
  fileName: string,
  data: string,
): Promise<void> => {
  if (!checkIfFileOrDirectoryExists(path)) {
    fs.mkdirSync(path);
  }

  const writeFile = promisify(fs.writeFile);

  return await writeFile(`${path}/${fileName}`, data, 'utf8');
};

export const deleteFile = async (path: string): Promise<void> => {
  const unlink = promisify(fs.unlink);

  return await unlink(path);
};

export const copySourceDirectoryToDirectory = async (
  from: string,
  to: string,
) => {
  const copy = promisify(fse.copy);
  try {
    await copy(from, to);
    return true;
  } catch (err) {
    console.log(JSON.stringify(err));
    return false;
  }
};

export const removeDirectory = async (path) => {
  const remove = promisify(fse.remove);
  try {
    await remove(path);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const readDir = async (path: string) => {
  const readDir = promisify(fs.readdir);
  try {
    return await readDir(path);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const getSourceFiles = async (path: string) => {
  const files = await readDir(path);
  return await Promise.all(
    files.map(async (fileName) => {
      const sourceString = await getFile(`${path}/${fileName}`, 'utf-8');
      const isSourceString = typeof sourceString === 'string';
      return {
        name: fileName,
        source: isSourceString && JSON.parse(sourceString),
      };
    }),
  );
};
