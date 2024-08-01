'use strict';

const inventoryController = require('../controllers/inventoryController');

module.exports = {
  name: 'inventory',
  version: '1.0.0',
  register: (server) => {
    server.route([
      {
        method: 'GET',
        path: '/inventory',
        handler: inventoryController.find,
        options: {
          description: 'List all inventories',
          tags: ['api']
        }
      },
      {
        method: 'POST',
        path: '/inventory',
        handler: inventoryController.create,
        options: {
          description: 'Create a inventory',
          tags: ['api']
        }
      },
      {
        method: 'GET',
        path: '/inventory/{id}',
        handler: inventoryController.getById,
        options: {
          description: 'Get a inventory by id',
          tags: ['api']
        }
      },
      {
        method: 'DELETE',
        path: '/inventory/{id}',
        handler: inventoryController.delete,
        options: {
          description: 'Delete a inventory',
          tags: ['api']
        }
      }
    ]);
  }
};
