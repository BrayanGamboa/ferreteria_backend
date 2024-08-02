'use strict';

const {
  generateCurrentDate,
  convertUpperCase
} = require('../../../utilities/general_functions');

module.exports = async (id, fields, { authRoleRepository }) => {
  if (fields.name) {
    const validationName = await authRoleRepository.getByFilter({
      name: convertUpperCase(fields.name)
    });
    if (validationName) return 484;
  }
  fields = {
    info: { update_date: generateCurrentDate() },
    ...fields
  };

  const resultUpdateRole = await authRoleRepository.update(id, fields);
  if (!resultUpdateRole) return false;
  return resultUpdateRole;
};
