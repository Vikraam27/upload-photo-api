const routes = (handler) => [
  {
    method: 'POST',
    path: '/upload',
    handler: handler.updateProfileImgHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },
];

module.exports = routes;
