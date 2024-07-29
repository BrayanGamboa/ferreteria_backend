'use strict';

const documentTypeController = require('../controllers/documentTypeController');

module.exports = {
  name: 'document type',
  version: '1.0.0',
  register: (server) => {
    server.route([
      {
        method: 'GET',
        path: '/document_type',
        handler: documentTypeController.find,
        options: {
          description: 'List all documents type',
          tags: ['api']
        }
      },
      {
        method: 'POST',
        path: '/document_type',
        handler: documentTypeController.create,
        options: {
          description: 'Create a document type',
          tags: ['api']
        }
      },
      {
        method: 'GET',
        path: '/document_type/{id}',
        handler: documentTypeController.getById,
        options: {
          description: 'Get a document type by id',
          tags: ['api']
        }
      },
      {
        method: 'DELETE',
        path: '/document_type/{id}',
        handler: documentTypeController.delete,
        options: {
          description: 'Delete a document type',
          tags: ['api']
        }
      }
    ]);
  }
};
