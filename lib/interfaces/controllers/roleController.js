'use strict';

const Boom = require('@hapi/boom');
const getAllRole = require('../../application/use_cases/auth/role/list_role');
const createRole = require('../../application/use_cases/auth/role/create_role');
const getRoleById = require('../../application/use_cases/auth/role/get_role_by_id');
const deleteRole = require('../../application/use_cases/auth/role/delete_role');

module.exports = {
  async create(request) {

    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { name, description } = request.payload;

    // Treatment
    const role = await createRole(name, description, serviceLocator);
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
    const users = await getAllRole(serviceLocator);

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
    const role = await getRoleById(id, serviceLocator);

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
    await deleteRole(id, serviceLocator);

    // Output
    return h.response().code(204);
  },

};
