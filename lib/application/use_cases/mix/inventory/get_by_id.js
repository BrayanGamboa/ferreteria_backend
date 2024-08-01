'use strict';

module.exports = async (id, { mixInventoryRepository }) => {
  return await mixInventoryRepository.getByFilter({ id });
};
