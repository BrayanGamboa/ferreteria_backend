'use strict';
const Role = require('../../domain/auth_role/role');
const RoleRepository = require('../../domain/auth_role/role_repository');
const { auth_role } = require('../orm/sequelize/models/relational_models');
const {
  convertCamelToSnakeCase
} = require('../../application/utilities/general_functions');

module.exports = class extends RoleRepository {
  async persist(domain_role) {
    try {
      const { name, description, info } = convertCamelToSnakeCase(domain_role);
      const seqCreateRole = await auth_role.create({ name, description, info });
      return new Role(
        seqCreateRole.id,
        seqCreateRole.name,
        seqCreateRole.description,
        seqCreateRole.info
      );
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async getByFilter(filter) {
    try {
      filter = convertCamelToSnakeCase(filter);
      const seqGetRole = await auth_role.findAll({
        where: filter
      });
      if (seqGetRole.length > 0) {
        return seqGetRole.map((role) => {
          return new Role(role.id, role.name, role.description, role.info);
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
      await auth_role.update(fields, {
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
      await auth_role.destroy({
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
