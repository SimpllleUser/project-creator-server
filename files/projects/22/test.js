const projectStructure = {
    config: ['config', 'constants'],
    controllers: ['AuthController', 'UserController'],
    db: ['config', 'index'],
    models: ['User'],
    routes: ['AuthRoutes', 'UserRoutes'],
    services: ['UserService'],
    utils: ['AuthUtils', 'Logger', 'Utils']
};

const importFiles = [
    {
        type: 'global',
        name: "dotenv",
    },
    {
        type: 'util',
        name: "AuthUtils",
    },
];

const getImportsModule = ({ type, name }) => {
    const typesByPath = {
        'global': '',
        'service': './service/',
        'controller': './controllers/',
        'database': './db/',
        'model': './models/',
        'route': './routes/',
        'util': './utils/',
    };
    return `import ${name} from "${typesByPath[type]}${name}"`;
};

(() => {
    console.log(importFiles.map(getImportsModule).join(';\n'));
})()