const { generateProjectDirs } = require('./generator-dirs');
const { runGeneratorCode } = require('./generator-code');
const { generateConfigProject } = require('./genearate-config-project');

const generatorMethods = [
    generateProjectDirs,
    runGeneratorCode,
    generateConfigProject,
];
const runGenerateProject = (project) => Promise.all(
    generatorMethods.map(async (method) => await method(project))
);

(async () => {
    const project = { id: 1111, title: 'Some-title', description: 'Some-description' }
    await runGenerateProject(project);
})();

module.exports = {
    runGenerateProject,
}