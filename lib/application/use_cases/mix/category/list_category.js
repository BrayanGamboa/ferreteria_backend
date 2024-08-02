'use strict';

module.exports = async ({ mixCategoryRepository }) => {
  return await mixCategoryRepository.getByFilter();
};
