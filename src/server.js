/* eslint-disable global-require */
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const innert = require('@hapi/inert');
// uploads
const uploads = require('./api/uploads');
const StorageControllers = require('./controllers/storage/StorageControllers');
const UploadsValidator = require('./validator/uploads');

// exception
const ClientError = require('./exceptions/ClientError');

const init = async () => {
  const storageControllers = new StorageControllers();

  const server = Hapi.server({
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // register external plugin
  await server.register([
    {
      plugin: innert,
    },
  ]);

  // register plugin
  await server.register([
    {
      plugin: uploads,
      options: {
        controllers: storageControllers,
        validator: UploadsValidator,
      },
    },
  ]);

  // handling client error and server error
  await server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const ClientErrorResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      ClientErrorResponse.code(response.statusCode);
      return ClientErrorResponse;
    }

    const serverError = h.response({
      status: 'error',
      statusCode: 500,
      message: 'Server Error',
    });
    serverError.code(500);
    return response.continue || response;
  });
  
  await server.start();
  console.log(`server running on ${server.info.uri}`);
};

init();
