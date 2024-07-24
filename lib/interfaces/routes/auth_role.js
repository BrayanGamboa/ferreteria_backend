'use strict';

const roleController = require('../controllers/roleController');

module.exports = {
  name: 'role',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/role',
        handler: roleController.find,
        options: {
          description: 'List all roles',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/role',
        handler: roleController.create,
        options: {
          description: 'Create a role',
          tags: ['api'],
        },
      },
      {
        method: 'GET',
        path: '/role/{id}',
        handler: roleController.getById,
        options: {
          description: 'Get a role by id',
          tags: ['api'],
        },
      },
      {
        method: 'DELETE',
        path: '/role/{id}',
        handler: roleController.delete,
        options: {
          description: 'Delete a role',
          tags: ['api'],
        },
      },
    ]);
  }
};