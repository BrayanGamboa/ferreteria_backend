'use strict';

const Boom = require('@hapi/boom');
const getAllUsers = require('../../application/use_cases/auth/user/list_users');
const createUser = require('../../application/use_cases/auth/user/create_user');
const getUserById = require('../../application/use_cases/auth/user/get_user_by_id');
const deleteUser = require('../../application/use_cases/auth/user/delete_user');

module.exports = {
  async create(request) {

    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id, roleId, documentTypeId, name, lastName, email, dateBirthday, } = request.payload;

    // Treatment
    const user = await createUser(id, roleId, documentTypeId, name, lastName, email, dateBirthday, serviceLocator);

    // Output
    return serviceLocator.userSerializer.serialize(user);
  },

  async find(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Treatment
    const users = await getAllUsers(serviceLocator);

    if (users === null) return h.response().code(204);
    if (!users)
      return new Boom.Boom(undefined, { statusCode: 503 });

    // Output
    return h
      .response(users.map(serviceLocator.userSerializer.serialize)).code(200)
  },

  async getById(request, h) {

    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const user = await getUserById(id, serviceLocator);

    // Output
    if (user === null) return h.response().code(204);
    if (!user)
      return new Boom.Boom(undefined, { statusCode: 503 });

    return h
      .response(
        serviceLocator.userSerializer.serialize(user))
      .code(201);
  },

  async delete(request, h) {

    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    await deleteUser(id, serviceLocator);

    // Output
    return h.response().code(204);
  },

};
