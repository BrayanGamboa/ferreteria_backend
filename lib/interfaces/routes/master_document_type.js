'use strict';

const documentTypeController = require('../controllers/documentTypeController');

module.exports = {
  name: 'role',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/document_type',
        handler: documentTypeController.find,
        options: {
          description: 'List all roles',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/document_type',
        handler: documentTypeController.create,
        options: {
          description: 'Create a role',
          tags: ['api'],
        },
      },
      {
        method: 'GET',
        path: '/document_type/{id}',
        handler: documentTypeController.getById,
        options: {
          description: 'Get a role by id',
          tags: ['api'],
        },
      },
      {
        method: 'DELETE',
        path: '/document_type/{id}',
        handler: documentTypeController.delete,
        options: {
          description: 'Delete a role',
          tags: ['api'],
        },
      },
    ]);
  }
};