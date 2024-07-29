'use strict';

module.exports = async (id, { masterDocumentTypeRepository }) => {
  const validationExist = await masterDocumentTypeRepository.getByFilter({
    id
  });
  return validationExist != null
    ? await masterDocumentTypeRepository.remove(id)
    : 432;
};
