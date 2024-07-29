"use strict";
const User = require("../../domain/auth_user/user");
const UserRepository = require("../../domain/auth_user/user_repository");
const { auth_user } = require("../orm/sequelize/models/relational_models");
const {
  convertCamelToSnakeCase,
} = require("../../application/utilities/general_functions");
const { where } = require("sequelize");

module.exports = class extends UserRepository {
  async persist(domain_user) {
    try {
      const {
        id,
        role_id,
        document_type_id,
        name,
        last_name,
        email,
        date_birthday,
        info,
      } = convertCamelToSnakeCase(domain_user);
      const seqCreateUser = await auth_user.create(
        {
          id,
          role_id,
          document_type_id,
          name,
          last_name,
          email,
          date_birthday,
          info
        }
      );
      return new User(
        seqCreateUser.id,
        seqCreateUser.role_id,
        seqCreateUser.document_type_id,
        seqCreateUser.name,
        seqCreateUser.last_name,
        seqCreateUser.email,
        seqCreateUser.date_birthday,
        seqCreateUser.info
      );
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async getByFilter(filter) {
    try {
      filter = convertCamelToSnakeCase(filter);
      const seqGetUsers = await auth_user.findAll({
        where: filter
      });
      if (seqGetUsers.length > 0) {
        return seqGetUsers.map((user) => {
          return new User(
            user.id,
            user.role_id,
            user.document_type_id,
            user.name,
            user.last_name,
            user.email,
            user.date_birthday,
            user.info
          );
        })
      } else return null;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async remove(id) {
    try {
      await auth_user.destroy({
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

  async update(id, fields) {
    try {
      const seqUserBefore = await this.getByFilter({ id });
      if (!seqUserBefore) return seqUserBefore;
      fields = convertCamelToSnakeCase(fields);
      fields = {
        ...seqUserBefore[0],
        ...fields
      };

      await auth_user.update(fields, {
        where: { id }
      });

      const [seqUserAfter] = await this.getByFilter({ id });
      return seqUserAfter;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
};
