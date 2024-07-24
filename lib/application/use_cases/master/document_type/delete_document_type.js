'use strict';

module.exports = (id, { authRoleRepository }) => {
  return authRoleRepository.remove(id);
};
