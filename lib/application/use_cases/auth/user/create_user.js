'use strict';

const User = require('../../../../domain/auth_user/user');
const { generateCurrentDate } = require('../../../utilities/general_functions') 

module.exports = async (id, roleId, documentTypeId, name, lastName, email, dateBirthday,  { authUserRepository }) => {

  //Validamos que el email no se encuentre registrado
  const validationEmail = await authUserRepository.getByFilter({email});
  if (validationEmail) return 484;
  if (validationEmail === false) return false;

  const user = new User(id,roleId, documentTypeId, name, lastName, email, dateBirthday, {
    registerDate: generateCurrentDate(),
    updateDate: null
  });
  
  return await authUserRepository.persist(user);
};
