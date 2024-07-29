'use strict';

const bootstrap = require('./lib/infrastructure/config/bootstrap');
const createServer = require('./lib/infrastructure/webserver/server');

// Start the server
const start = async () => {
  try {
    await bootstrap.init();

    const server = await createServer();
    await server.start();
    // eslint-disable-next-line no-console
    console.log('Server running at:', server.info.uri);
    // eslint-disable-next-line
    process.exit(1);
  } catch (err) {
    console.error(err);
    // eslint-disable-next-line
    process.exit(1);
  }
};

start();
