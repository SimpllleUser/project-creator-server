const path = require('path');

module.exports =  {
    getPathJoin: (dirName) => path.join(__dirname, dirName),
    JSONtoStringJSON: (json) => JSON.stringify(json, null, 4).replace(/\"/g, ""),
    arrayToLinesCode: (array) => array.reduce((actualString, currentString) => `${actualString} \n ${currentString};`, ''),
    getBodyPath: (dirName, fileName) => dirName === 'is-src' ? `/${fileName}` : `/${dirName}/${fileName}`,
    getMkdirPath: (recourcePath, dirName) => dirName === 'is-src' ? '' : `${recourcePath}/${dirName}`,
};