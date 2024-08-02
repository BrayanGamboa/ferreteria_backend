'use strict';

const siteController = require('../controllers/siteController');

module.exports = {
  name: 'site',
  version: '1.0.0',
  register: (server) => {
    server.route([
      {
        method: 'GET',
        path: '/site',
        handler: siteController.find,
        options: {
          description: 'List all sites',
          tags: ['api']
        }
      },
      {
        method: 'POST',
        path: '/site',
        handler: siteController.create,
        options: {
          description: 'Create a site',
          tags: ['api']
        }
      },
      {
        method: 'PATCH',
        path: '/site/{id}',
        handler: siteController.getById,
        options: {
          description: 'Update a site',
          tags: ['api']
        }
      },
      {
        method: 'GET',
        path: '/site/{id}',
        handler: siteController.getById,
        options: {
          description: 'Get a site by id',
          tags: ['api']
        }
      },
      {
        method: 'DELETE',
        path: '/site/{id}',
        handler: siteController.delete,
        options: {
          description: 'Delete a site',
          tags: ['api']
        }
      }
    ]);
  }
};
