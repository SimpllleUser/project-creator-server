const fs = require('fs-extra');
const { getPathJoin } = require('./utils');

const generateDB = async ({ title }) => {
  const pathDbFrom = './src/db.sqlite';
  try {
    await fs.copyFile(pathDbFrom, `${getPathJoin(`/${title}`)}/db/db.sqlite`)
  } catch (err) {
    console.error(err)
  }
};

module.exports = {
  generateDB,
};