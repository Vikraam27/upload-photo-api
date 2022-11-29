const UploadsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'uploads',
  version: '1.0.0',
  register: async (server, { controllers, validator, userControllers }) => {
    const uploadsHandler = new UploadsHandler(controllers, validator, userControllers);
    server.route(routes(uploadsHandler));
  },
};
