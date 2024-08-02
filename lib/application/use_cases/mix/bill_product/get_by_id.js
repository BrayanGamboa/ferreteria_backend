'use strict';

module.exports = async (id, { mixBillProductRepository }) => {
  return await mixBillProductRepository.getByFilter({ id });
};
