'use strict';

const Boom = require('@hapi/boom');
const getAllDocumentType = require('../../application/use_cases/master/document_type/list');
const createDocumentType = require('../../application/use_cases/master/document_type/create');
const getDocumentTypeById = require('../../application/use_cases/master/document_type/get_by_id');
const deleteDocumentType = require('../../application/use_cases/master/document_type/delete');
const updateDocumentType = require('../../application/use_cases/master/document_type/update');

module.exports = {
  async create(request) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { name, description } = request.payload;

    // Treatment
    const documentType = await createDocumentType(
      name,
      description,
      serviceLocator
    );

    const errorMessages = {
      484: 'The document type name all ready exist in database'
    };

    if (documentType in errorMessages) {
      return new Boom.Boom(errorMessages[documentType], {
        statusCode: documentType
      });
    }

    if (!documentType) return new Boom.Boom(undefined, { statusCode: 503 });
    // Output
    return serviceLocator.masterDocumentTypeSerializer.serialize(documentType);
  },

  async find(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Treatment
    const documentTypes = await getAllDocumentType(serviceLocator);

    // Output
    if (documentTypes === null) return h.response().code(204);
    if (!documentTypes) return new Boom.Boom(undefined, { statusCode: 503 });
    return h
      .response(
        documentTypes.map(serviceLocator.masterDocumentTypeSerializer.serialize)
      )
      .code(200);
  },

  async getById(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const documentType = await getDocumentTypeById(id, serviceLocator);

    // Output
    if (documentType === null) return h.response().code(204);
    if (!documentType) return new Boom.Boom(undefined, { statusCode: 503 });

    return h
      .response(
        serviceLocator.masterDocumentTypeSerializer.serialize(documentType)
      )
      .code(201);
  },

  async update(request) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const fields = request.payload;
    const { id } = request.params;

    // Treatment
    const documentType = await updateDocumentType(id, fields, serviceLocator);

    // Output
    const errorMessages = {
      484: 'The document type name all ready exist in database'
    };

    if (documentType in errorMessages) {
      return new Boom.Boom(errorMessages[documentType], {
        statusCode: documentType
      });
    }

    if (!documentType) return new Boom.Boom(undefined, { statusCode: 503 });
    return serviceLocator.masterDocumentTypeSerializer.serialize(documentType);
  },

  async delete(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const documentType = await deleteDocumentType(id, serviceLocator);

    // Output

    const errorMessages = {
      432: 'The document type not exist in database'
    };

    if (documentType in errorMessages) {
      return new Boom.Boom(errorMessages[documentType], {
        statusCode: documentType
      });
    }

    if (!documentType) return new Boom.Boom(undefined, { statusCode: 503 });
    return h.response('Document type deleted successfully!').code(200);
  }
};
