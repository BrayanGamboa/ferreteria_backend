'use strict';

const Site = require('../../../../domain/mix_site/site');
const {
  generateCurrentDate,
  convertUpperCase
} = require('../../../utilities/general_functions');

module.exports = async (name, address, number_phone, { mixSiteRepository }) => {
  name = await convertUpperCase(name);
  //Validate that a record with the same name is not found.
  const validationName = await mixSiteRepository.getByFilter({ name });
  if (validationName) return 484;
  if (validationName === false) return false;

  const site = new Site(null, name, address, number_phone, {
    registerDate: generateCurrentDate(),
    updateDate: null
  });

  const resultCreateSite = await mixSiteRepository.persist(site);
  if (!resultCreateSite) return false;
  return resultCreateSite;
};
