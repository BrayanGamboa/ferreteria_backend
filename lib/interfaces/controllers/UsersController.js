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
    const {
      document,
      roleId,
      documentTypeId,
      name,
      lastName,
      email,
      dateBirthday
    } = request.payload;

    // Treatment
    const user = await createUser(
      document,
      roleId,
      documentTypeId,
      name,
      lastName,
      email,
      dateBirthday,
      serviceLocator
    );

    // Output
    if (484 === user)
      return new Boom.Boom('The user email all ready exist in database', {
        statusCode: user
      });
    if (485 === user)
      return new Boom.Boom('The document all ready exist in database', {
        statusCode: user
      });
    if (!user) return new Boom.Boom(undefined, { statusCode: 503 });
    return serviceLocator.authUserSerializer.serialize(user);
  },

  async find(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Treatment
    const users = await getAllUsers(serviceLocator);

    // Output

    if (users === null) return h.response().code(204);
    if (!users) return new Boom.Boom(undefined, { statusCode: 503 });
    return h
      .response(users.map(serviceLocator.authUserSerializer.serialize))
      .code(200);
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
    if (!user) return new Boom.Boom(undefined, { statusCode: 503 });

    return h
      .response(serviceLocator.authUserSerializer.serialize(user))
      .code(201);
  },

  async delete(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const user = await deleteUser(id, serviceLocator);

    // Output
    if (user === 432)
      return new Boom.Boom('The user not exist in database', {
        statusCode: user
      });
    if (!user) return new Boom.Boom(undefined, { statusCode: 503 });
    return h.response('User deleted successfully!').code(200);
  }
};
