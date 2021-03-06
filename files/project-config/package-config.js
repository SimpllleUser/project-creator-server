const config = JSON.parse(
    JSON.stringify({
        "name": "projectname",
        "version": "1.0.0",
        "description": "your awesome project",
        "main": "index.js",
        "scripts": {
            "dev": "nodemon --exec babel-node ./src/app.js",
            "build": "rm -rf ./build && babel -d ./build ./src -s",
            "db:migrate": "npx sequelize-cli db:migrate",
            "test": "export NODE_ENV=test &&  npx sequelize db:migrate:undo:all  && npx sequelize db:migrate  && nyc --require @babel/register  mocha ./test/users.js --timeout 20000 --exit",
            "generate-lcov": "nyc report --reporter=text-lcov > lcov.info",
            "coveralls-coverage": "coveralls < lcov.info",
            "codeclimate-coverage": "codeclimate-test-reporter < lcov.info",
            "coverage": "nyc npm test && npm run generate-lcov && npm run coveralls-coverage && npm run codeclimate-coverage"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "dependencies": {
            "chai": "^4.2.0",
            "chai-http": "^4.3.0",
            "dotenv": "^8.2.0",
            "express": "^4.17.1",
            "nodemon": "^2.0.2",
            "path": "^0.12.7",
            "pg": "^7.18.0",
            "sqlite3": "^4.1.1",
            "pg-hstore": "^2.3.3",
            "sequelize": "^5.21.4",
            "bcrypt": "^3.0.8",
            "jsonwebtoken": "^8.5.1",
            "morgan": "^1.9.1",
            "winston": "^3.2.1"
        },
        "devDependencies": {
            "@babel/cli": "^7.8.4",
            "@babel/core": "^7.8.4",
            "@babel/node": "^7.8.4",
            "@babel/plugin-transform-runtime": "^7.8.3",
            "@babel/preset-env": "^7.8.4",
            "@babel/register": "^7.8.3",
            "@babel/runtime": "^7.8.4",
            "babel-loader": "^8.0.6",
            "eslint": "^6.8.0",
            "eslint-config-airbnb-base": "^14.0.0",
            "eslint-plugin-import": "^2.20.1",
            "mocha": "^7.0.1",
            "nyc": "^15.0.0",
            "codeclimate-test-reporter": "^0.5.1"
        },
        "engines": {
            "npm": ">= 6.0.0",
            "node": ">= 13.0.0"
        }
    })
);

module.exports = {
    config,
};