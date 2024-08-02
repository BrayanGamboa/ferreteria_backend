'use strict';

module.exports = async(id, { authUserRepository }) => {
  return await authUserRepository.getByFilter({ id });
};
