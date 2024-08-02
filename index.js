/* eslint-disable no-undef */
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

    // Manejo de señales de salida para limpiar recursos
    const shutdown = () => {
      server.stop({ timeout: 10000 }).then((err) => {
        // eslint-disable-next-line no-console
        console.log('Server stopped.');
        process.exit(err ? 1 : 0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
