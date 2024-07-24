'use strict';

const Role = require('../../../../domain/auth_role/role');
const { generateCurrentDate } = require('../../../utilities/general_functions') 


module.exports = async (name, description, { authRoleRepository }) => {

  //Validamos que el 'name' no se encuentre registrado
  const validationName = await authRoleRepository.getByFilter({name});
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
