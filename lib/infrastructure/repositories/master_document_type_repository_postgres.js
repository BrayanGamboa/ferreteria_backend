'use strict';
const DocumentType = require('../../domain/master_document_type/document_type');
const DocumentTypeRepository = require('../../domain/master_document_type/document_type_repository');
const {
  master_document_type
} = require('../orm/sequelize/models/relational_models');
const {
  convertCamelToSnakeCase
} = require('../../application/utilities/general_functions');

module.exports = class extends DocumentTypeRepository {
  async persist(domain_document_type) {
    try {
      const { name, description, info } =
        convertCamelToSnakeCase(domain_document_type);
      const seqCreateDocumentType = await master_document_type.create({
        name,
        description,
        info
      });
      return new DocumentType(
        seqCreateDocumentType.id,
        seqCreateDocumentType.name,
        seqCreateDocumentType.description,
        seqCreateDocumentType.info
      );
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async getByFilter(filter) {
    try {
      filter = convertCamelToSnakeCase(filter);
      const seqGetDocumentType = await master_document_type.findAll({
        where: filter
      });
      if (seqGetDocumentType.length > 0) {
        return seqGetDocumentType.map((document_type) => {
          return new DocumentType(
            document_type.id,
            document_type.name,
            document_type.description,
            document_type.info
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
      await master_document_type.update(fields, {
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
      await master_document_type.destroy({
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
