'use strict';

module.exports = async ({ mixBillRepository }) => {
  return await mixBillRepository.getByFilter();
};
