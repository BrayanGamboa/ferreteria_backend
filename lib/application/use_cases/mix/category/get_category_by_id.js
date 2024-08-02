'use strict';

module.exports = async (id, { mixCategoryRepository }) => {
  return await mixCategoryRepository.getByFilter({ id });
};
