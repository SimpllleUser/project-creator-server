const getImport = ({ type, name }) => {
    const typesByPath = {
        'global': '',
        'service': 'service',
        'controller': 'controllers',
        'database': 'db',
        'model': 'models',
        'route': 'routes',
        'util': 'utils',
    };
    if (type === 'global') return `import ${name} from "${name}"`
    return `import ${name} from "../${typesByPath[type]}/${name}"`;
};

const generateImports = (imports) => {
    return imports.map(getImport).join(';\n');
};

module.exports = {
    generateImports,
};
