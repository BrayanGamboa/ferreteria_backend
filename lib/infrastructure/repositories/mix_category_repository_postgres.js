"use strict";
const Category = require("../../domain/mix_category/category");
const CategoryRepository = require("../../domain/mix_category/category_repository");
const { mix_category } = require("../orm/sequelize/models/relational_models");
const {
  convertCamelToSnakeCase,
} = require("../../application/utilities/general_functions");

module.exports = class extends CategoryRepository {
  async persist(domain_category) {
    try {
      const {
        name,
        description,
        info
      } = convertCamelToSnakeCase(domain_category);
      const seqCreateCategory = await mix_category.create(
        { name, description, info }
      )
      return new Category(seqCreateCategory.id, seqCreateCategory.name,
        seqCreateCategory.description, seqCreateCategory.info);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async getByFilter(filter) {
    try {
      filter = convertCamelToSnakeCase(filter);
      const seqGetCategory = await mix_category.findAll({
        where: filter
      });
      if (seqGetCategory.length > 0) {
        return seqGetCategory.map((category) => {
          return new Category(
            category.id,
            category.name,
            category.description,
            category.info
          );
        })
      } else return null;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async update(id, fields) {
    try {
      const seqCategoryBefore = await this.getByFilter({ id });
      if (!seqCategoryBefore) return seqCategoryBefore;
      fields = convertCamelToSnakeCase(fields);
      fields = {
        ...seqCategoryBefore[0],
        ...fields
      }
      await mix_category.update(fields, {
        where: { id }
      });

      const [seqCategoryAfter] = await this.getByFilter({ id });
      return seqCategoryAfter;

    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async remove(id) {
    try {
      await mix_category.destroy({
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