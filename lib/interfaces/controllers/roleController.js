'use strict';

const Boom = require('@hapi/boom');
const getAllRole = require('../../application/use_cases/auth/role/list_role');
const createRole = require('../../application/use_cases/auth/role/create_role');
const getRoleById = require('../../application/use_cases/auth/role/get_role_by_id');
const deleteRole = require('../../application/use_cases/auth/role/delete_role');
const updateRole = require('../../application/use_cases/auth/role/update_role');

module.exports = {
  async create(request) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { name, description } = request.payload;

    // Treatment
    const role = await createRole(name, description, serviceLocator);

    // Output
    const errorMessages = {
      484: 'The role name all ready exist in database'
    };

    if (role in errorMessages)
      return new Boom.Boom(errorMessages[role], { statusCode: role });
    if (!role) return new Boom.Boom(undefined, { statusCode: 503 });
    return serviceLocator.authRoleSerializer.serialize(role);
  },

  async update(request) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const fields = request.payload;
    const { id } = request.params;

    // Treatment
    const role = await updateRole(id, fields, serviceLocator);

    // Output

    const errorMessages = {
      484: 'The role name all ready exist in database'
    };

    if (role in errorMessages) {
      return new Boom.Boom(errorMessages[role], { statusCode: role });
    }

    if (!role) return new Boom.Boom(undefined, { statusCode: 503 });
    return serviceLocator.authRoleSerializer.serialize(role);
  },

  async find(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Treatment
    const roles = await getAllRole(serviceLocator);

    // Output
    if (roles === null) return h.response().code(204);
    if (!roles) return new Boom.Boom(undefined, { statusCode: 503 });
    return h
      .response(roles.map(serviceLocator.authRoleSerializer.serialize))
      .code(200);
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
    if (!role) return new Boom.Boom(undefined, { statusCode: 503 });
    return h
      .response(serviceLocator.authRoleSerializer.serialize(role))
      .code(201);
  },

  async delete(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const role = await deleteRole(id, serviceLocator);

    // Output

    const errorMessages = {
      432: 'The role not exist in database',
      441: 'The role id is present in some user'
    };

    if (role in errorMessages)
      return new Boom.Boom(errorMessages[role], { statusCode: role });

    if (!role) return new Boom.Boom(undefined, { statusCode: 503 });
    return h.response('Role deleted successfully!').code(200);
  }
};
