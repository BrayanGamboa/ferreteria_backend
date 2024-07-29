'use strict';

module.exports = (id, { authRoleRepository }) => {
  return authRoleRepository.getByFilter({ id });
};
