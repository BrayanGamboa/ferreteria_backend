'use strict';

module.exports = async (id, { mixBillRepository }) => {
  return await mixBillRepository.getByFilter({ id });
};
