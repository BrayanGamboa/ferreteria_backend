'use strict';

const User = require('../../../../domain/auth_user/user');
const { generateCurrentDate } = require('../../../utilities/general_functions');

module.exports = async (
  id,
  roleId,
  documentTypeId,
  name,
  lastName,
  email,
  dateBirthday,
  { authUserRepository }
) => {
  //Validate that a record with the same document is not found.
  const validationId = await authUserRepository.getByFilter({ id });
  if (validationId) return 485;
  if (validationId === false) return false;

  //Validate that a record with the same email is not found.
  const validationEmail = await authUserRepository.getByFilter({ email });
  if (validationEmail) return 484;
  if (validationEmail === false) return false;

  const user = new User(
    id,
    roleId,
    documentTypeId,
    name,
    lastName,
    email,
    dateBirthday,
    {
      registerDate: generateCurrentDate(),
      updateDate: null
    }
  );

  return await authUserRepository.persist(user);
};
