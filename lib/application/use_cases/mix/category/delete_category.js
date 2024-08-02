'use strict';

module.exports = async (id, { mixCategoryRepository }) => {
  const validationExist = await mixCategoryRepository.getByFilter({ id });
  return validationExist != null ? await mixCategoryRepository.remove(id) : 432;
};
