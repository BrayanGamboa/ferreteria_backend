'use strict';

const usersController = require('../controllers/usersController');

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/user',
        handler: usersController.find,
        options: {
          description: 'List all users',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/user',
        handler: usersController.create,
        options: {
          description: 'Create a user',
          tags: ['api'],
        },
      },
      {
        method: 'GET',
        path: '/user/{id}',
        handler: usersController.getById,
        options: {
          description: 'Get a user by document (id)',
          tags: ['api'],
        },
      },
      {
        method: 'DELETE',
        path: '/users/{id}',
        handler: usersController.delete,
        options: {
          description: 'Delete a user',
          tags: ['api'],
        },
      },
    ]);
  }
};