'use strict';

module.exports = async (id, { mixProductRepository }) => {
  const validationExist = await mixProductRepository.getByFilter({ id });
  return validationExist != null ? await mixProductRepository.remove(id) : 432;
};
