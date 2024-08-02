'use strict';
const Inventory = require('../../domain/mix_inventory/inventory');
const InventoryRepository = require('../../domain/mix_inventory/inventory_repository');
const { mix_inventory } = require('../orm/sequelize/models/relational_models');
const {
  convertCamelToSnakeCase
} = require('../../application/utilities/general_functions');

module.exports = class extends InventoryRepository {
  async persist(domain_inventory) {
    try {
      const { product_id, site_id, quantity, info } =
        convertCamelToSnakeCase(domain_inventory);
      const seqCreate = await mix_inventory.create({
        product_id,
        site_id,
        quantity,
        info
      });
      return new Inventory(
        seqCreate.id,
        seqCreate.product_id,
        seqCreate.site_id,
        seqCreate.quantity,
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
      const seqGet = await mix_inventory.findAll({
        where: filter
      });
      if (seqGet.length > 0) {
        return seqGet.map((inventory) => {
          return new Inventory(
            inventory.id,
            inventory.product_id,
            inventory.site_id,
            inventory.quantity,
            inventory.info
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
      await mix_inventory.update(fields, {
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
      await mix_inventory.destroy({
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
