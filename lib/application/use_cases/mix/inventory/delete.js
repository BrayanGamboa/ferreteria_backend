'use strict';

module.exports = async (id, { mixInventoryRepository }) => {
  const validationExist = await mixInventoryRepository.getByFilter({ id });
  return validationExist != null ? await mixInventoryRepository.remove(id) : 432;
};
