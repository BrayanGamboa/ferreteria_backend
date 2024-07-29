'use strict';

module.exports = (id, { masterDocumentTypeRepository }) => {
  return masterDocumentTypeRepository.getByFilter({ id });
};
