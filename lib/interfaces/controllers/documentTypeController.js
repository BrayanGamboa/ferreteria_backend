'use strict';

const Boom = require('@hapi/boom');
const getAllDocumentType = require('../../application/use_cases/master/document_type/list_document_type');
const createDocumentType = require('../../application/use_cases/master/document_type/create_document_type');
const getDocumentTypeById = require('../../application/use_cases/master/document_type/get_document_type_by_id');
const deleteDocumentType = require('../../application/use_cases/master/document_type/delete_document_type');

module.exports = {
  async create(request) {

    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { name, description } = request.payload;

    // Treatment
    const role = await createDocumentType(name, description, serviceLocator);
    if (484 === role)
      return new Boom.Boom('The role name all ready exist in database', { statusCode: role });
    if (!role) return new Boom.Boom(undefined, { statusCode: 503 });
    // Output
    return serviceLocator.authRoleSerializer.serialize(role);
  },

  async find(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Treatment
    const users = await getAllDocumentType(serviceLocator);

    if (users === null) return h.response().code(204);
    if (!users)
      return new Boom.Boom(undefined, { statusCode: 503 });

    // Output
    return h
      .response(users.map(serviceLocator.authRoleSerializer.serialize)).code(200)
  },

  async getById(request, h) {

    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const role = await getDocumentTypeById(id, serviceLocator);

    // Output
    if (role === null) return h.response().code(204);
    if (!role)
      return new Boom.Boom(undefined, { statusCode: 503 });

    return h
      .response(
        serviceLocator.authRoleSerializer.serialize(role))
      .code(201);
  },

  async delete(request, h) {

    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const documentType = await deleteDocumentType(id, serviceLocator);
    if (!documentType) 
      return new Boom.Boom(undefined, { statusCode: 503 });

    // Output
    return h.response('Document type deleted').code(200);
  },

};
