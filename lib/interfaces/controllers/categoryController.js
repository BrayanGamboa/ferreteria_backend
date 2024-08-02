'use strict';

const Boom = require('@hapi/boom');
const getAllCategory = require('../../application/use_cases/mix/category/list');
const createCategory = require('../../application/use_cases/mix/category/create');
const getCategoryById = require('../../application/use_cases/mix/category/get_by_id');
const deleteCategory = require('../../application/use_cases/mix/category/delete');
const updateCategory = require('../../application/use_cases/mix/category/update');

module.exports = {
  async create(request) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { name, description } = request.payload;

    // Treatment
    const category = await createCategory(name, description, serviceLocator);

    // Output
    const errorMessages = {
      484: 'The category name all ready exist in database'
    };

    if (category in errorMessages) {
      return new Boom.Boom(errorMessages[category], {
        statusCode: category
      });
    }

    if (!category) return new Boom.Boom(undefined, { statusCode: 503 });

    return serviceLocator.mixCategorySerializer.serialize(category);
  },

  async find(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Treatment
    const documentTypes = await getAllCategory(serviceLocator);

    // Output
    if (documentTypes === null) return h.response().code(204);
    if (!documentTypes) return new Boom.Boom(undefined, { statusCode: 503 });
    return h
      .response(
        documentTypes.map(serviceLocator.mixCategorySerializer.serialize)
      )
      .code(200);
  },

  async update(request) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const fields = request.payload;
    const { id } = request.params;

    // Treatment
    const category = await updateCategory(id, fields, serviceLocator);

    // Output

    const errorMessages = {
      484: 'The category name all ready exist in database'
    };

    if (category in errorMessages) {
      return new Boom.Boom(errorMessages[category], { statusCode: category });
    }

    if (!category) return new Boom.Boom(undefined, { statusCode: 503 });
    return serviceLocator.authRoleSerializer.serialize(category);
  },

  async getById(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const category = await getCategoryById(id, serviceLocator);

    // Output
    if (category === null) return h.response().code(204);
    if (!category) return new Boom.Boom(undefined, { statusCode: 503 });

    return h
      .response(serviceLocator.mixCategorySerializer.serialize(category))
      .code(201);
  },

  async delete(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const category = await deleteCategory(id, serviceLocator);

    // Output
    const errorMessages = {
      432: 'The category not exist in database',
      441: 'The category id is present in some product'
    };

    if (category in errorMessages) {
      return new Boom.Boom(errorMessages[category], { statusCode: category });
    }

    if (!category) return new Boom.Boom(undefined, { statusCode: 503 });
    return h.response('Category deleted successfully!').code(200);
  }
};
