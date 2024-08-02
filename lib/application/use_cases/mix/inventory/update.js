'use strict';
const {
  generateCurrentDate
} = require('../../../utilities/general_functions');

module.exports = async (id, fields, { mixInventoryRepository }) => {
  /*Falta implementar la a qué rol está asociado un vendedor o trabajados, con esto validamos lo siguiente:*/
  //Validate that a record with the same product is not found.
  // if (fields.productId) {
  //   const validationProduct = await mixInventoryRepository.getByFilter({
  //     productId: fields.productId
  //   });
  //   if (validationProduct) return 484;
  // }
  fields = {
    info: { update_date: generateCurrentDate() },
    ...fields
  };

  const resultUpdate = await mixInventoryRepository.update(id, fields);
  return !resultUpdate ? false : resultUpdate;
};
