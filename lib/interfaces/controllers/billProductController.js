'use strict';

const Boom = require('@hapi/boom');
const getAllBill = require('../../application/use_cases/mix/bill_product/list');
const createBill = require('../../application/use_cases/mix/bill_product/create');
const getBillById = require('../../application/use_cases/mix/bill_product/get_by_id');
const deleteBill = require('../../application/use_cases/mix/bill_product/delete');

module.exports = {
  async find(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Treatment
    const bills = await getAllBill(serviceLocator);

    // Output
    if (bills === null) return h.response().code(204);
    if (!bills) return new Boom.Boom(undefined, { statusCode: 503 });
    return h
      .response(bills.map(serviceLocator.mixBillProductSerializer.serialize))
      .code(200);
  },

  async create(request) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { billId, productId, numberProducts } = request.payload;

    // Treatment
    const billProduct = await createBill(
      billId,
      productId,
      numberProducts,
      serviceLocator
    );
    if (432 === billProduct)
      return new Boom.Boom('The bill id not found', {
        statusCode: billProduct
      });
    if (!billProduct) return new Boom.Boom(undefined, { statusCode: 503 });
    // Output
    return serviceLocator.mixBillProductSerializer.serialize(billProduct);
  },

  async getById(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const billProduct = await getBillById(id, serviceLocator);

    // Output
    if (billProduct === null) return h.response().code(204);
    if (!billProduct) return new Boom.Boom(undefined, { statusCode: 503 });

    return h
      .response(serviceLocator.mixBillProductSerializer.serialize(billProduct))
      .code(201);
  },

  async delete(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const billProduct = await deleteBill(id, serviceLocator);

    // Output
    if (billProduct === 432)
      return new Boom.Boom('The bill product not exist in database', {
        statusCode: billProduct
      });
    if (!billProduct) return new Boom.Boom(undefined, { statusCode: 503 });
    return h.response('Bill product deleted successfully!').code(200);
  }
};
