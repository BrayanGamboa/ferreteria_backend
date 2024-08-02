'use strict';
const Site = require('../../domain/mix_site/site');
const SiteRepository = require('../../domain/mix_site/site_repository');
const { mix_site } = require('../orm/sequelize/models/relational_models');
const {
  convertCamelToSnakeCase
} = require('../../application/utilities/general_functions');

module.exports = class extends SiteRepository {
  async persist(domain_site) {
    try {
      const { name, address, number_phone, info } =
        convertCamelToSnakeCase(domain_site);
      const seqCreate = await mix_site.create({
        name,
        address,
        number_phone,
        info
      });
      return new Site(
        seqCreate.id,
        seqCreate.name,
        seqCreate.address,
        seqCreate.number_phone,
        seqCreate.info
      );
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async getByFilter(filter) {
    try {
      filter = convertCamelToSnakeCase(filter);
      const seqGet = await mix_site.findAll({
        where: filter
      });
      if (seqGet.length > 0) {
        return seqGet.map((site) => {
          return new Site(
            site.id,
            site.name,
            site.address,
            site.number_phone,
            site.info
          );
        });
      } else return null;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async update(id, fields) {
    try {
      const seqBefore = await this.getByFilter({ id });
      if (!seqBefore) return seqBefore;
      fields = convertCamelToSnakeCase(fields);
      fields.info = {
        ...seqBefore[0].info,
        ...fields.info
      };
      await mix_site.update(fields, {
        where: { id }
      });

      const seqAfter = await this.getByFilter({ id });
      return !seqAfter ? seqAfter : seqAfter[0];
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async remove(id) {
    try {
      await mix_site.destroy({
        where: {
          id
        }
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
};
