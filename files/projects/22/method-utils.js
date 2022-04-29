const { JSONtoStringJSON } = require('./utils');

const typeOfArguments = {
    "variable": (argument) => argument.name,
    "object": (argument) => JSONtoStringJSON(argument.structure),
}

const getArgumnet = (parameterArgument) => typeOfArguments[parameterArgument.type](parameterArgument);
const getMethodTypes = (types) => types.join(' ');
const getMethodArguments = (types) => types.map((argumentOption) => getArgumnet(argumentOption)).join(',');

const generateCallMethodsFromTypeEntity = ({ name, method }) => (typeEntityName) => {
    const result = getResultOfMethod(method.resultTo);
    const type = getMethodTypes(method.types);
    const serviceMethodName = method.name;
    const args = getMethodArguments(method.params);

    return `${result} ${type} ${typeEntityName}.${serviceMethodName}(${args});\n`;
}

const generateCallMethodFromModel = (params) => generateCallMethodsFromTypeEntity(params)(`database.${params.name}`);
const generateCallMethodFromService = (params) => generateCallMethodsFromTypeEntity(params)(params.name);

const getResultOfMethod = (resultTo) => {
    if (!resultTo) return 'return';
    if (resultTo === 'none') return '';
    const { name, type } = resultTo?.variable;
    return` ${type} ${name} = `; 
};

const tryCatchWrapper = (code) => `try {
    ${code}
} catch(error) { 
    throw error
}`;

const controllerTryCatchWrapper = (code) => `try {
    ${code}
} catch(error) { 
    util.setError(400, error.message);
    return util.send(res);
}`;

module.exports = {
    generateCallMethodFromModel,
    generateCallMethodFromService,
    getMethodArguments,
    getMethodTypes,
    tryCatchWrapper,
    controllerTryCatchWrapper,
}