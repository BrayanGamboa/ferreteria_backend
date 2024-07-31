'use strict';

module.exports = async (id, { mixProductRepository }) => {
  return await mixProductRepository.getByFilter({ id });
};
