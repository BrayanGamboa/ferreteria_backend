'use strict';
const Bill = require('../../domain/mix_bill/bill');
const BillRepository = require('../../domain/mix_bill/bill_repository');
const { mix_bill } = require('../orm/sequelize/models/relational_models');
const {
  convertCamelToSnakeCase
} = require('../../application/utilities/general_functions');

module.exports = class extends BillRepository {
  async persist(domain_bill) {
    try {
      const { site_id, client_id, employed_id, note, info } =
        convertCamelToSnakeCase(domain_bill);
      const seqCreate = await mix_bill.create({
        site_id,
        client_id,
        employed_id,
        note,
        info
      });
      return new Bill(
        seqCreate.id,
        seqCreate.site_id,
        seqCreate.client_id,
        seqCreate.employed_id,
        seqCreate.note,
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
      const seqGet = await mix_bill.findAll({
        where: filter
      });
      if (seqGet.length > 0) {
        return seqGet.map((bill) => {
          return new Bill(
            bill.id,
            bill.site_id,
            bill.client_id,
            bill.employed_id,
            bill.note,
            bill.info
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
      fields = {
        ...seqBefore[0],
        ...fields
      };
      await mix_bill.update(fields, {
        where: { id }
      });

      const [seqAfter] = await this.getByFilter({ id });
      return seqAfter;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async remove(id) {
    try {
      await mix_bill.destroy({
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
