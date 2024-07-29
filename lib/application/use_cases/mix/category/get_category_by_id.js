'use strict';

module.exports = (id, { mixCategoryRepository }) => {
  return mixCategoryRepository.getByFilter({ id });
};
