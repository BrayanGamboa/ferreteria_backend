'use strict';

module.exports = (id, { authUserRepository }) => {
  return authUserRepository.remove(id);
};
