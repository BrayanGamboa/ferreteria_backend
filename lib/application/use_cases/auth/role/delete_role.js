'use strict';

module.exports = async (id, { authRoleRepository, authUserRepository }) => {
  //Validate if the role exists
  const validationExist = await authRoleRepository.getByFilter({ id });
  if (!validationExist) return 432;

  //Validate if the role id is present in some user
  const validationRoleUsers = await authUserRepository.getByFilter({
    role_id: id
  });
  return validationRoleUsers ? 441 : await authRoleRepository.remove(id);
};
