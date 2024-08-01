'use strict';

module.exports = async (id, { masterDocumentTypeRepository }) => {
  return await masterDocumentTypeRepository.getByFilter({ id });
};
