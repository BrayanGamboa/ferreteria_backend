'use strict';

const documentTypeController = require('../controllers/categoryController');

module.exports = {
  name: 'category',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/category',
        handler: documentTypeController.find,
        options: {
          description: 'List all categories',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/category',
        handler: documentTypeController.create,
        options: {
          description: 'Create a category',
          tags: ['api'],
        },
      },
      {
        method: 'GET',
        path: '/category/{id}',
        handler: documentTypeController.getById,
        options: {
          description: 'Get a category by id',
          tags: ['api'],
        },
      },
      {
        method: 'DELETE',
        path: '/category/{id}',
        handler: documentTypeController.delete,
        options: {
          description: 'Delete a category',
          tags: ['api'],
        },
      },
    ]);
  }
};