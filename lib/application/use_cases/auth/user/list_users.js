'use strict';

module.exports = ({ authUserRepository }) => {
  return authUserRepository.getByFilter();
};
