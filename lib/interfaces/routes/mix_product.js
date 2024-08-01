'use strict';

const productController = require('../controllers/productController');

module.exports = {
  name: 'product',
  version: '1.0.0',
  register: (server) => {
    server.route([
      {
        method: 'GET',
        path: '/product',
        handler: productController.find,
        options: {
          description: 'List all products',
          tags: ['api']
        }
      },
      {
        method: 'POST',
        path: '/product',
        handler: productController.create,
        options: {
          description: 'Create a product',
          tags: ['api']
        }
      },
      {
        method: 'GET',
        path: '/product/{id}',
        handler: productController.getById,
        options: {
          description: 'Get a product by id',
          tags: ['api']
        }
      },
      {
        method: 'DELETE',
        path: '/product/{id}',
        handler: productController.delete,
        options: {
          description: 'Delete a product',
          tags: ['api']
        }
      }
    ]);
  }
};
