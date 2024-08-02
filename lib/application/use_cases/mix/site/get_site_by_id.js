'use strict';

module.exports = async (id, { mixSiteRepository }) => {
  return await mixSiteRepository.getByFilter({ id });
};
