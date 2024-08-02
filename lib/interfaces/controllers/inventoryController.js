'use strict';

const Boom = require('@hapi/boom');
const getAllInventory = require('../../application/use_cases/mix/inventory/list');
const createInventory = require('../../application/use_cases/mix/inventory/create');
const getInventoryById = require('../../application/use_cases/mix/inventory/get_by_id');
const deleteInventory = require('../../application/use_cases/mix/inventory/delete');
const updateInventory = require('../../application/use_cases/mix/inventory/update');

module.exports = {
  async find(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Treatment
    const inventories = await getAllInventory(serviceLocator);

    // Output
    if (inventories === null) return h.response().code(204);
    if (!inventories) return new Boom.Boom(undefined, { statusCode: 503 });
    return h
      .response(
        inventories.map(serviceLocator.mixInventorySerializer.serialize)
      )
      .code(200);
  },

  async create(request) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { productId, siteId, quantity } = request.payload;

    // Treatment
    const inventory = await createInventory(
      productId,
      siteId,
      quantity,
      serviceLocator
    );

    // Output
    const errorMessages = {
      432: 'The product id not found',
      433: 'The site id not found'
    };

    if (inventory in errorMessages)
      return new Boom.Boom(errorMessages[inventory], {
        statusCode: inventory
      });

    if (!inventory) return new Boom.Boom(undefined, { statusCode: 503 });
    return serviceLocator.mixInventorySerializer.serialize(inventory);
  },
  async update(request) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const fields = request.payload;
    const { id } = request.params;

    // Treatment
    const inventory = await updateInventory(id, fields, serviceLocator);

    // Output
    const errorMessages = {
      484: 'The product all ready exist in this site'
    };

    if (inventory in errorMessages)
      return new Boom.Boom(errorMessages[inventory], {
        statusCode: inventory
      });

    if (!inventory) return new Boom.Boom(undefined, { statusCode: 503 });
    return serviceLocator.mixInventorySerializer.serialize(inventory);
  },
  async getById(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const inventory = await getInventoryById(id, serviceLocator);

    // Output
    if (inventory === null) return h.response().code(204);
    if (!inventory) return new Boom.Boom(undefined, { statusCode: 503 });

    return h
      .response(serviceLocator.mixInventorySerializer.serialize(inventory))
      .code(201);
  },

  async delete(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const inventory = await deleteInventory(id, serviceLocator);

    // Output

    const errorMessages = {
      432: 'The inventory not exist in database'
    };
    if (inventory in errorMessages)
      return new Boom.Boom(errorMessages[inventory], {
        statusCode: inventory
      });

    if (!inventory) return new Boom.Boom(undefined, { statusCode: 503 });
    return h.response('Inventory deleted successfully!').code(200);
  }
};
