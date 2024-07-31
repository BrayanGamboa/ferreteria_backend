'use strict';

const Boom = require('@hapi/boom');
const getAllProduct = require('../../application/use_cases/mix/product/list_product');
const createProduct = require('../../application/use_cases/mix/product/create_product');
const getProductById = require('../../application/use_cases/mix/product/get_product_by_id');
const deleteProduct = require('../../application/use_cases/mix/product/delete_product');

module.exports = {
  async find(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Treatment
    const products = await getAllProduct(serviceLocator);

    // Output
    if (products === null) return h.response().code(204);
    if (!products) return new Boom.Boom(undefined, { statusCode: 503 });
    return h
      .response(products.map(serviceLocator.mixProductSerializer.serialize))
      .code(200);
  },

  async create(request) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { categoryId, name, description, price } = request.payload;

    // Treatment
    const product = await createProduct(
      categoryId,
      name,
      description,
      price,
      serviceLocator
    );
    if (484 === product)
      return new Boom.Boom('The product name all ready exist in database', {
        statusCode: product
      });
    if (432 === product)
      return new Boom.Boom('The category id not found', {
        statusCode: product
      });
    if (!product) return new Boom.Boom(undefined, { statusCode: 503 });
    // Output
    return serviceLocator.mixProductSerializer.serialize(product);
  },

  async getById(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const product = await getProductById(id, serviceLocator);

    // Output
    if (product === null) return h.response().code(204);
    if (!product) return new Boom.Boom(undefined, { statusCode: 503 });

    return h
      .response(serviceLocator.mixProductSerializer.serialize(product))
      .code(201);
  },

  async delete(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const product = await deleteProduct(id, serviceLocator);

    // Output
    if (product === 432)
      return new Boom.Boom('The product not exist in database', {
        statusCode: product
      });
    if (!product) return new Boom.Boom(undefined, { statusCode: 503 });
    return h.response('Product deleted successfully!').code(200);
  }
};
