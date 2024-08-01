'use strict';

module.exports = async ({ masterDocumentTypeRepository }) => {
  return await masterDocumentTypeRepository.getByFilter();
};
