'use strict';

const Boom = require('@hapi/boom');
const getAllSite = require('../../application/use_cases/mix/site/list_site');
const createSite = require('../../application/use_cases/mix/site/create_site');
const getSiteById = require('../../application/use_cases/mix/site/get_site_by_id');
const deleteSite = require('../../application/use_cases/mix/site/delete_site');

module.exports = {
  async find(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Treatment
    const sites = await getAllSite(serviceLocator);

    // Output
    if (sites === null) return h.response().code(204);
    if (!sites) return new Boom.Boom(undefined, { statusCode: 503 });
    return h
      .response(sites.map(serviceLocator.mixSiteSerializer.serialize))
      .code(200);
  },

  async create(request) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { name, address, numberPhone } = request.payload;

    // Treatment
    const site = await createSite(name, address, numberPhone, serviceLocator);
    if (484 === site)
      return new Boom.Boom('The site name all ready exist in database', {
        statusCode: site
      });
    if (!site) return new Boom.Boom(undefined, { statusCode: 503 });
    // Output
    return serviceLocator.mixSiteSerializer.serialize(site);
  },

  async getById(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const site = await getSiteById(id, serviceLocator);

    // Output
    if (site === null) return h.response().code(204);
    if (!site) return new Boom.Boom(undefined, { statusCode: 503 });

    return h
      .response(serviceLocator.mixSiteSerializer.serialize(site))
      .code(201);
  },

  async delete(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const site = await deleteSite(id, serviceLocator);

    // Output
    if (site === 432)
      return new Boom.Boom('The site not exist in database', {
        statusCode: site
      });
    if (!site) return new Boom.Boom(undefined, { statusCode: 503 });
    return h.response('Site deleted successfully!').code(200);
  }
};
