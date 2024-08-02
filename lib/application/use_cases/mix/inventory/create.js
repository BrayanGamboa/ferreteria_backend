'use strict';

const Inventory = require('../../../../domain/mix_inventory/inventory');
const { generateCurrentDate } = require('../../../utilities/general_functions');

module.exports = async (
  product_id,
  site_id,
  quantity,
  { mixInventoryRepository, mixSiteRepository, mixProductRepository }
) => {
  //Validate if product already exists in the database
  const validationProduct = await mixProductRepository.getByFilter({
    id: product_id
  });
  if (validationProduct === null) return 432;
  if (validationProduct === false) return false;

  //Validate if site exists in the database
  const validationSite = await mixSiteRepository.getByFilter({
    id: site_id
  });
  if (validationSite === null) return 433;
  if (validationSite === false) return false;

  const inventory = new Inventory(null, product_id, site_id, quantity, {
    registerDate: generateCurrentDate(),
    updateDate: null
  });

  const resultCreateInventory = await mixInventoryRepository.persist(inventory);
  return resultCreateInventory ? resultCreateInventory : false;
};
