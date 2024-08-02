'use strict';

module.exports = async (
  id,
  { mixSiteRepository, mixInventoryRepository, mixBillRepository }
) => {
  const validationExist = await mixSiteRepository.getByFilter({ id });
  if (!validationExist) return 432;

  const validationSiteInventory = await mixInventoryRepository.getByFilter({site_id: id});
  if (!validationSiteInventory) return 441;

  const validationSiteBill = await mixBillRepository.getByFilter({site_id: id});

  return validationSiteBill ? 442 : await mixSiteRepository.remove(id);
};
