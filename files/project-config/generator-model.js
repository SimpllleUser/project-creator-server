const { readFile, } = require('fs').promises;
const { getPathJoin, JSONtoStringJSON } = require('./utils');

const getFiledParams = (fieldParmas) => ({
    ...fieldParmas,
    type: `DataTypes.${fieldParmas.type}`,
});

const generateModel = (model) => {
    const fieldKeys = Object.keys(model.fields);
    const structureModelFields = fieldKeys.reduce((tableFileds, filedName) => ({
         ...tableFileds,
         [filedName]: getFiledParams(model.fields[filedName])
         }), {});

    return  `
    module.exports = (sequelize, DataTypes) => {
        const ${model.name} = sequelize.define(${model.name},
            ${JSONtoStringJSON(structureModelFields)},
            ${JSONtoStringJSON(model['table-params'])});
            ${model.name}.associate = function (models) {}

            return ${model.name};
    }`;
};

module.exports = {
    generateModel
};