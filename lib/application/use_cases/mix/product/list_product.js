'use strict';

module.exports = async ({ mixProductRepository }) => {
  return await mixProductRepository.getByFilter();
};
