const { writeFile } = require('fs').promises;
const { getPathJoin } = require('./utils');
const { generateDB } = require('./generate-db');
const { config } = require('./package-config');


const generateConfigProject = async ({ id, title, description }) => {
    const configBody = JSON.stringify({ ...config, name: title, description });
    const packagePath = getPathJoin(`/${title}/package.json`);
    const envBody = `PORT=${id}`
    const envPath = getPathJoin(`/${title}/.env`);
    const DBPath = getPathJoin(`/${title}/db/db.sqlite`);
    await writeFile(packagePath, configBody);
    await writeFile(envPath, envBody);
    await generateDB({ title });
};

module.exports = {
    generateConfigProject,
};
