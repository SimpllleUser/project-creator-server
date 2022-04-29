const { JSONtoStringJSON, arrayToLinesCode } = require('./utils');
const { generateModel } = require('./generator-model');
const { generateService } = require('./generator-service');
const { gereneateRouters } = require('./generator-router');
const { generateController } = require('./generator-controller');
const { generateImports } = require('./genrator-import');

// const generateImports = arrayToLinesCode;
const generateInitImports = generateImports;
const generateModuleExport = (json) => `export default ${JSONtoStringJSON(json)};`;
const generateStaticCode = (string) => `${string}`;

const genrateByKeyObject = {
    'imports': generateImports,
    'init-module': arrayToLinesCode,
    'export-default': generateModuleExport,
    'static-code': generateStaticCode,
    'app-use': arrayToLinesCode,
    'constants': arrayToLinesCode,
    'route-modules': arrayToLinesCode,
    'model': generateModel,
    'service': generateService,
    'routers': gereneateRouters,
    'controller': generateController,

};

module.exports = {
    generateImports,
    generateInitImports,
    generateModuleExport,
    genrateByKeyObject,
};