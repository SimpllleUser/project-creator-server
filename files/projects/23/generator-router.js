const getRouter = ({ name, path, controller, method }) => `router.${name}(${path},${controller}.${method.name})`;
const getRouters = (routers) => routers.map(getRouter).join(';\n');

const gereneateRouters = (routers) => getRouters(routers);

module.exports = {
    gereneateRouters,
}