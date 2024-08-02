'use strict';

module.exports = async ({ mixSiteRepository }) => {
  return await mixSiteRepository.getByFilter();
};
