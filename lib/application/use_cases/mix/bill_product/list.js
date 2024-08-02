'use strict';

module.exports = async ({ mixBillProductRepository }) => {
  return await mixBillProductRepository.getByFilter();
};
