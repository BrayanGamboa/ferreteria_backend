'use strict';

module.exports = async (id, { mixSiteRepository }) => {
  const validationExist = await mixSiteRepository.getByFilter({ id });
  return validationExist != null ? await mixSiteRepository.remove(id) : 432;
};
