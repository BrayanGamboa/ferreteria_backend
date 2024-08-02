'use strict';
const BillProduct = require('../../domain/mix_bill_product/bill_product');
const BillProductRepository = require('../../domain/mix_bill_product/bill_product_repository');
const {
  mix_bill_product
} = require('../orm/sequelize/models/relational_models');
const {
  convertCamelToSnakeCase
} = require('../../application/utilities/general_functions');

module.exports = class extends BillProductRepository {
  async persist(domain_bill_product) {
    try {
      const { bill_id, product_id, number_products, info } =
        convertCamelToSnakeCase(domain_bill_product);
      const seqCreate = await mix_bill_product.create({
        bill_id,
        product_id,
        number_products,
        info
      });
      return new BillProduct(
        seqCreate.id,
        seqCreate.bill_id,
        seqCreate.product_id,
        seqCreate.number_products,
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
      const seqGet = await mix_bill_product.findAll({
        where: filter
      });
      if (seqGet.length > 0) {
        return seqGet.map((bill_product) => {
          return new BillProduct(
            bill_product.id,
            bill_product.bill_id,
            bill_product.product_id,
            bill_product.number_products,
            bill_product.info
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
      await mix_bill_product.update(fields, {
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
      await mix_bill_product.destroy({
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
