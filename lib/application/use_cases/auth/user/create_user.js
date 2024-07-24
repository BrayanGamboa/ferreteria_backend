'use strict';

const User = require('../../../../domain/auth_user/user');

module.exports = (id, roleId, documentTypeId, name, lastName, email, dateBirthday, info,  { userRepository }) => {
  const user = new User(id,roleId, documentTypeId, name, lastName, email, dateBirthday, info);
  return userRepository.persist(user);
};
