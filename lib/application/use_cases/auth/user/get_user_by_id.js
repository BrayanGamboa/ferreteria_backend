'use strict';

module.exports = (id, { authUserRepository }) => {
  return authUserRepository.getByFilter({ id });
};
