'use strict';

const Boom = require('@hapi/boom');
const getAllCategory = require('../../application/use_cases/mix/category/list_category');
const createCategory = require('../../application/use_cases/mix/category/create_category');
const getCategoryById = require('../../application/use_cases/mix/category/get_category_by_id');
const deleteCategory = require('../../application/use_cases/mix/category/delete_category');

module.exports = {
  async create(request) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { name, description } = request.payload;

    // Treatment
    const category = await createCategory(name, description, serviceLocator);
    if (484 === category)
      return new Boom.Boom('The category name all ready exist in database', {
        statusCode: category
      });
    if (!category) return new Boom.Boom(undefined, { statusCode: 503 });
    // Output
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
    if (category === 432)
      return new Boom.Boom('The category not exist in database', {
        statusCode: category
      });
    if (!category) return new Boom.Boom(undefined, { statusCode: 503 });
    return h.response('Category deleted successfully!').code(200);
  }
};
