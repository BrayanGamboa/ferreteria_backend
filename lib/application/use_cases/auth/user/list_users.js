'use strict';

module.exports = async({ authUserRepository }) => {
  return await authUserRepository.getByFilter();
};
