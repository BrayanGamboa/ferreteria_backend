'use strict';
const {
  generateCurrentDate,
  convertUpperCase
} = require('../../../utilities/general_functions');

module.exports = async (id, fields, { mixSiteRepository }) => {
  //Validate that a record with the same name is not found.
  if (fields.name) {
    const validationName = await mixSiteRepository.getByFilter({
      name: convertUpperCase(fields.name)
    });
    if (validationName) return 484;
  }
  if (fields.address) {
    const validationAddress = await mixSiteRepository.getByFilter({
      address: convertUpperCase(fields.address)
    });
    if (validationAddress) return 485;
  }
  fields = {
    info: { update_date: generateCurrentDate() },
    ...fields
  };

  const resultUpdate = await mixSiteRepository.update(id, fields);
  return !resultUpdate ? false : resultUpdate;
};
