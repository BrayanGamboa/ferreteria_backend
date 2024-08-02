'use strict';

const categoryController = require('../controllers/categoryController');

module.exports = {
  name: 'category',
  version: '1.0.0',
  register: (server) => {
    server.route([
      {
        method: 'GET',
        path: '/category',
        handler: categoryController.find,
        options: {
          description: 'List all categories',
          tags: ['api']
        }
      },
      {
        method: 'POST',
        path: '/category',
        handler: categoryController.create,
        options: {
          description: 'Create a category',
          tags: ['api']
        }
      },
      {
        method: 'PATCH',
        path: '/category/{id}',
        handler: categoryController.update,
        options: {
          description: 'Update a category',
          tags: ['api']
        }
      },
      {
        method: 'GET',
        path: '/category/{id}',
        handler: categoryController.getById,
        options: {
          description: 'Get a category by id',
          tags: ['api']
        }
      },
      {
        method: 'DELETE',
        path: '/category/{id}',
        handler: categoryController.delete,
        options: {
          description: 'Delete a category',
          tags: ['api']
        }
      }
    ]);
  }
};
