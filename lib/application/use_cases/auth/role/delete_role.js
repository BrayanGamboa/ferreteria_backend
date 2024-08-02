'use strict';

module.exports = async (id, { authRoleRepository }) => {
  const validationExist = await authRoleRepository.getByFilter({ id });
  return validationExist != null ? await authRoleRepository.remove(id) : 432;
};
