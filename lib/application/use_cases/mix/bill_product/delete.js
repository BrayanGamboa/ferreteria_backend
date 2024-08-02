'use strict';

module.exports = async (id, { mixBillProductRepository }) => {
  const validationExist = await mixBillProductRepository.getByFilter({ id });
  return validationExist != null ? await mixBillProductRepository.remove(id) : 432;
};
