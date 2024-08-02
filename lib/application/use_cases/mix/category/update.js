'use strict';
const {
  generateCurrentDate,
  convertUpperCase
} = require('../../../utilities/general_functions');

module.exports = async (id, fields, { mixCategoryRepository }) => {
  //Validate that a record with the same name is not found.
  if (fields.name) {
    const validationName = await mixCategoryRepository.getByFilter({
      name: convertUpperCase(fields.name)
    });
    if (validationName) return 484;
  }
  fields = {
    info: { update_date: generateCurrentDate() },
    ...fields
  };

  const resultUpdate = await mixCategoryRepository.update(id, fields);
  return !resultUpdate ? false : resultUpdate;
};
