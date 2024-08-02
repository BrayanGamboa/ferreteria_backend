'use strict';

const Boom = require('@hapi/boom');
const getAllBill = require('../../application/use_cases/mix/bill/list');
const createBill = require('../../application/use_cases/mix/bill/create');
const getBillById = require('../../application/use_cases/mix/bill/get_by_id');
const deleteBill = require('../../application/use_cases/mix/bill/delete');

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
      .response(bills.map(serviceLocator.mixBillSerializer.serialize))
      .code(200);
  },

  async create(request) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { siteId, clientId, employedId, note } = request.payload;

    // Treatment
    const bill = await createBill(
      siteId,
      clientId,
      employedId,
      note,
      serviceLocator
    );
    if (432 === bill)
      return new Boom.Boom('The client id not found', {
        statusCode: bill
      });
    if (433 === bill)
      return new Boom.Boom('The employed id not found', {
        statusCode: bill
      });
    if (434 === bill)
      return new Boom.Boom('The site id not found', {
        statusCode: bill
      });
    if (!bill) return new Boom.Boom(undefined, { statusCode: 503 });
    // Output
    return serviceLocator.mixBillSerializer.serialize(bill);
  },

  async getById(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const bill = await getBillById(id, serviceLocator);

    // Output
    if (bill === null) return h.response().code(204);
    if (!bill) return new Boom.Boom(undefined, { statusCode: 503 });

    return h
      .response(serviceLocator.mixBillSerializer.serialize(bill))
      .code(201);
  },

  async delete(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const bill = await deleteBill(id, serviceLocator);

    // Output
    if (bill === 432)
      return new Boom.Boom('The bill not exist in database', {
        statusCode: bill
      });
    if (!bill) return new Boom.Boom(undefined, { statusCode: 503 });
    return h.response('Bill deleted successfully!').code(200);
  }
};
