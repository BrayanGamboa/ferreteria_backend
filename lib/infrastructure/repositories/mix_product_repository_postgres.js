'use strict';
const Product = require('../../domain/mix_product/product');
const ProductRepository = require('../../domain/mix_product/product_repository');
const { mix_product } = require('../orm/sequelize/models/relational_models');
const {
  convertCamelToSnakeCase
} = require('../../application/utilities/general_functions');

module.exports = class extends ProductRepository {
  async persist(domain_product) {
    try {
      const { category_id, name, description, price, info } =
        convertCamelToSnakeCase(domain_product);
      const seqCreate = await mix_product.create({
        category_id,
        name,
        description,
        price,
        info
      });
      return new Product(
        seqCreate.id,
        seqCreate.category_id,
        seqCreate.name,
        seqCreate.description,
        seqCreate.price,
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
      // El error pasa en la siguiente linea
      const seqGet = await mix_product.findAll({
        where: filter
      });
      if (seqGet.length > 0) {
        return seqGet.map((product) => {
          return new Product(
            product.id,
            product.category_id,
            product.name,
            product.description,
            product.price,
            product.info
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
      await mix_product.update(fields, {
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
      await mix_product.destroy({
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
