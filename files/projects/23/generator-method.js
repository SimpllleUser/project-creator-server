const { generateCondition } = require('./condition');
const {
    generateCallMethodFromModel,
    generateCallMethodFromService,
    getMethodArguments,
    getMethodTypes,
    tryCatchWrapper,
    controllerTryCatchWrapper } = require('./method-utils');

const typeGeneratesCode = {
    "conditions": generateCondition,
    "model": generateCallMethodFromModel,
    "service": generateCallMethodFromService,
};

const getCalledActions = (actions) => actions.map((action) => typeGeneratesCode[action.type](action[action.type])).join('');

const generateCallMethodFromEntity = ({ name,types,params, actions }) => (wrapper) => {
    const calledActions = getCalledActions(actions);
    return `
     ${getMethodTypes(types)} ${name}(${getMethodArguments(params)}) {
         ${wrapper(calledActions)}}`;
}

const generateServiceMethod = (serviceParams) => generateCallMethodFromEntity(serviceParams)(tryCatchWrapper);
const generateControllerMethod = (serviceParams) => generateCallMethodFromEntity(serviceParams)(controllerTryCatchWrapper);

module.exports = {
    generateServiceMethod,
    generateControllerMethod
};