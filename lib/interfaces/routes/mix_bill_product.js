'use strict';

const billProductController = require('../controllers/billProductController');

module.exports = {
  name: 'Bill Product',
  version: '1.0.0',
  register: (server) => {
    server.route([
      {
        method: 'GET',
        path: '/bill_product',
        handler: billProductController.find,
        options: {
          description: 'List all bill products',
          tags: ['api']
        }
      },
      {
        method: 'POST',
        path: '/bill_product',
        handler: billProductController.create,
        options: {
          description: 'Create a bill product',
          tags: ['api']
        }
      },
      {
        method: 'GET',
        path: '/bill_product/{id}',
        handler: billProductController.getById,
        options: {
          description: 'Get a bill product by id',
          tags: ['api']
        }
      },
      {
        method: 'DELETE',
        path: '/bill_product/{id}',
        handler: billProductController.delete,
        options: {
          description: 'Delete a bill product',
          tags: ['api']
        }
      }
    ]);
  }
};
