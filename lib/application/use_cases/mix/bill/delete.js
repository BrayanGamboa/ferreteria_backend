'use strict';

module.exports = async (id, { mixBillRepository }) => {
  const validationExist = await mixBillRepository.getByFilter({ id });
  return validationExist != null ? await mixBillRepository.remove(id) : 432;
};
