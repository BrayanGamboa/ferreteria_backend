'use strict';

const DocumentType = require('../../../../domain/master_document_type/document_type');
const {
  generateCurrentDate,
  convertUpperCase
} = require('../../../utilities/general_functions');

module.exports = async (
  name,
  description,
  { masterDocumentTypeRepository }
) => {
  name = await convertUpperCase(name);
  //Validate that a record with the same name is not found.
  const validationName = await masterDocumentTypeRepository.getByFilter({
    name
  });
  if (validationName) return 484;
  if (validationName === false) return false;

  const documentType = new DocumentType(null, name, description, {
    registerDate: generateCurrentDate(),
    updateDate: null
  });
  const resultCreateDocumentType =
    await masterDocumentTypeRepository.persist(documentType);
  if (!resultCreateDocumentType) return false;
  return resultCreateDocumentType;
};
