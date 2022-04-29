const dirTree = require("directory-tree");
const { getPathJoin } = require('./utils');

const recource = {
    from: './src',
    to: '_project',
};

const filteredFiles = (listDirectories) => listDirectories.filter((list) => !list.includes('db'))

const getProjectStructure = () => {
    const filesStructure = dirTree(recource.from);
    const getFileNameFromDirectory = ({ name }) => name.split('.')[0];
    return filesStructure.children.reduce((acc, curr) => {
        const existChildren = curr?.children?.length;
        const key = existChildren ? curr.name : 'is-src';
        const filesDirectory = existChildren ? curr.children.map(getFileNameFromDirectory) : [curr.name.split('.')[0]];
        return { ...acc, ...{ [key]: filteredFiles(filesDirectory) } };
    }, {});
};

const projectStructure = getProjectStructure();
const direcotiresOfProject = Object.keys(projectStructure);
const recourceFromPath = getPathJoin(`/${recource.to}`);

module.exports = {
    recource,
    recourceFromPath,
    projectStructure,
    direcotiresOfProject,
};