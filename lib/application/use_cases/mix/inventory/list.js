'use strict';

module.exports = async ({ mixInventoryRepository }) => {
  return await mixInventoryRepository.getByFilter();
};
