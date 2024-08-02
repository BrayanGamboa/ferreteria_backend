'use strict';

module.exports = async(id, { authRoleRepository }) => {
  return await authRoleRepository.getByFilter({ id });
};
