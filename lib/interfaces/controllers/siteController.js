'use strict';

const Boom = require('@hapi/boom');
const getAllSite = require('../../application/use_cases/mix/site/list');
const createSite = require('../../application/use_cases/mix/site/create');
const getSiteById = require('../../application/use_cases/mix/site/get_by_id');
const deleteSite = require('../../application/use_cases/mix/site/delete');
const updateSite = require('../../application/use_cases/mix/site/update');

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

    const errorMessages = {
      484: 'The site name all ready exist in database'
    };

    if (site in errorMessages)
      return new Boom.Boom(errorMessages[site], { statusCode: site });

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

  async update(request) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const fields = request.payload;
    const { id } = request.params;

    // Treatment
    const site = await updateSite(id, fields, serviceLocator);

    // Output
    const errorMessages = {
      484: 'The site name all ready exist in database',
      485: 'The site address all ready exist in database'
    };

    if (site in errorMessages)
      return new Boom.Boom(errorMessages[site], { statusCode: site });

    if (!site) return new Boom.Boom(undefined, { statusCode: 503 });
    return serviceLocator.authRoleSerializer.serialize(site);
  },

  async delete(request, h) {
    // Context
    const serviceLocator = request.server.app.serviceLocator;

    // Input
    const { id } = request.params;

    // Treatment
    const site = await deleteSite(id, serviceLocator);

    // Output
    const errorMessages = {
      432: 'The site not exist in database',
      441: 'The site id is present in some inventory',
      442: 'The site id is present in some bill'
    };
    if (site in errorMessages)
      return new Boom.Boom(errorMessages[site], { statusCode: site });
    if (!site) return new Boom.Boom(undefined, { statusCode: 503 });
    return h.response('Site deleted successfully!').code(200);
  }
};
