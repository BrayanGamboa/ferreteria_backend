'use strict';

module.exports = ({ masterDocumentTypeRepository }) => {
  return masterDocumentTypeRepository.getByFilter();
};
