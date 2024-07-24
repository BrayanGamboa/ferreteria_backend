'use strict';

const DocumentType = require('../../../../domain/master_document_type/document_type');
const { generateCurrentDate } = require('../../../utilities/general_functions') 


module.exports = async (name, description, { authRoleRepository }) => {

  //Validamos que el 'name' no se encuentre registrado
  const validationName = await authRoleRepository.getByFilter({name});
  if (validationName) return 484;
  if (validationName === false) return false;

  const documentType = new DocumentType(null, name, description, {
    registerDate: generateCurrentDate(),
    updateDate: null
  });
  
  const resultCreateDocumentType = await authRoleRepository.persist(documentType);
  if (!resultCreateRole) return false;
  return resultCreateRole;
};
