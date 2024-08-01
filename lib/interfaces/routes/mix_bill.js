'use strict';

const billController = require('../controllers/billController');

module.exports = {
  name: 'bill',
  version: '1.0.0',
  register: (server) => {
    server.route([
      {
        method: 'GET',
        path: '/bill',
        handler: billController.find,
        options: {
          description: 'List all bills',
          tags: ['api']
        }
      },
      {
        method: 'POST',
        path: '/bill',
        handler: billController.create,
        options: {
          description: 'Create a bill',
          tags: ['api']
        }
      },
      {
        method: 'GET',
        path: '/bill/{id}',
        handler: billController.getById,
        options: {
          description: 'Get a bill by id',
          tags: ['api']
        }
      },
      {
        method: 'DELETE',
        path: '/bill/{id}',
        handler: billController.delete,
        options: {
          description: 'Delete a bill',
          tags: ['api']
        }
      }
    ]);
  }
};
