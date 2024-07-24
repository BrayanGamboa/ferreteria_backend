'use strict';

module.exports = ({ authRoleRepository }) => {
  return authRoleRepository.getByFilter();
};
