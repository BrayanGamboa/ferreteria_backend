'use strict';

module.exports = async({ authRoleRepository }) => {
  return await authRoleRepository.getByFilter();
};
