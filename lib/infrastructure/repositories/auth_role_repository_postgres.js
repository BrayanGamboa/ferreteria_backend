"use strict";
const Role = require("../../domain/auth_role/role");
const RoleRepository = require("../../domain/auth_role/role_repository");
const { auth_role } = require("../orm/sequelize/models/relational_models");
const {
  convertCamelToSnakeCase,
} = require("../../application/utilities/general_functions");

module.exports = class extends RoleRepository {
  async persist(domain_role) {
    try {
      const {
        name,
        description,
        info
      } = convertCamelToSnakeCase(domain_role);
      const seqCreateRole = await auth_role.create(
        {name, description, info}
      )
      return new Role(seqCreateRole.id, seqCreateRole.name,
        seqCreateRole.description, seqCreateRole.info);
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
          return new Role(
            role.id,
            role.name,
            role.description,
            role.info
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
      const seqRoleBefore = await this.getByFilter({ id });
      if (!seqRoleBefore) return seqRoleBefore;
      fields = convertCamelToSnakeCase(fields);
      fields = {
        ...seqRoleBefore[0],
        ...fields
      }
      await auth_role.update(fields, {
        where: { id }
      });

      const [seqRoleAfter] = await this.getByFilter({ id });
      return seqRoleAfter;

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