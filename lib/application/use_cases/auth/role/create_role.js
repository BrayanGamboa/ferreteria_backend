'use strict';

const Role = require('../../../../domain/auth_role/role');
const { generateCurrentDate } = require('../../../utilities/general_functions');

module.exports = async (name, description, { authRoleRepository }) => {
  //Validate that a record with the same name is not found.
  const validationName = await authRoleRepository.getByFilter({ name });
  if (validationName) return 484;
  if (validationName === false) return false;

  const role = new Role(null, name, description, {
    registerDate: generateCurrentDate(),
    updateDate: null
  });
  const resultCreateRole = await authRoleRepository.persist(role);
  if (!resultCreateRole) return false;
  return resultCreateRole;
};
