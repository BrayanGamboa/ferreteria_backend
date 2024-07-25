'use strict';

module.exports = async (id, { authUserRepository }) => {
  const validationExist = await authUserRepository.getByFilter({ id });
  return validationExist != null ? await authUserRepository.remove(id) : 432;
};
