'use strict';

const Hapi = require('@hapi/hapi');
const Good = require('@hapi/good');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Blipp = require('blipp');
const HapiSwagger = require('hapi-swagger');
const Package = require('../../../package');

const createServer = async () => {
  // Create a server with a host and port
  const server = Hapi.server({
    // eslint-disable-next-line no-undef
    port: process.env.PORT || 3000
  });

  // Register vendors plugins
  await server.register([
    Blipp,
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Test API Documentation',
          version: Package.version
        }
      }
    },
    {
      plugin: Good,
      options: {
        ops: {
          interval: 1000 * 60
        },
        reporters: {
          myConsoleReporter: [
            {
              module: '@hapi/good-squeeze',
              name: 'Squeeze',
              args: [{ ops: '*', log: '*', error: '*', response: '*' }]
            },
            {
              module: '@hapi/good-console'
            },
            'stdout'
          ]
        }
      }
    }
  ]);

  // Register custom plugins
  await server.register([
    // require('./oauth'),
    // require('../../interfaces/routes/private'),
    require('../../interfaces/routes/auth_user'),
    require('../../interfaces/routes/auth_role'),
    require('../../interfaces/routes/master_document_type'),
    require('../../interfaces/routes/mix_category'),
    require('../../interfaces/routes/mix_site')

  ]);

  server.app.serviceLocator = require('../../infrastructure/config/service-locator');

  // Manejo de errores a nivel de servidor
  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    if (response.isBoom) {
      console.error('Server error:', response);
    }
    return h.continue;
  });

  return server;
};

module.exports = createServer;
