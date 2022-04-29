const { getMkdirPath, getPathJoin } = require('./utils');
const { recourceFromPath, direcotiresOfProject } = require('./generator-project-structure');
const { mkdirs } = require('fs-extra');

const generateProjectDirs = async ({ title }) => {
    await mkdirs(getPathJoin(`/${title}`));
    Promise.all(direcotiresOfProject.map(async (dirName) => {
        const dirPath = getMkdirPath(getPathJoin(`/${title}`), dirName);
        if (!dirPath) return;
        await mkdirs(dirPath);
    }));
};

module.exports = {
    generateProjectDirs
};