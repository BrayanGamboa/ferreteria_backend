'use strict';

const Bill = require('../../../../domain/mix_bill/bill');
const { generateCurrentDate } = require('../../../utilities/general_functions');

module.exports = async (
  siteId,
  clientId,
  employedId,
  note,
  { mixBillRepository, authUserRepository, mixSiteRepository }
) => {
  //Validate if the client already exists in the database
  const validationClient = await authUserRepository.getByFilter({
    id: clientId
  });
  if (validationClient === null) return 432;
  if (validationClient === false) return false;

  //Validate if the employed exists in the database
  const validationEmployed = await authUserRepository.getByFilter({
    id: employedId
  });
  if (validationEmployed === null) return 433;
  if (validationEmployed === false) return false;

  //Validate if the site exists in the database
  const validationSite = await mixSiteRepository.getByFilter({
    id: siteId
  });
  if (validationSite === null) return 434;
  if (validationSite === false) return false;

  const inventory = new Bill(null, siteId, clientId, employedId, note, {
    registerDate: generateCurrentDate(),
    updateDate: null
  });

  const resultCreateBill = await mixBillRepository.persist(inventory);
  return resultCreateBill ? resultCreateBill : false;
};
