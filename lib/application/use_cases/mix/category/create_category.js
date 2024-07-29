'use strict';

const Category = require('../../../../domain/mix_category/category');
const {
  generateCurrentDate,
  convertUpperCase
} = require('../../../utilities/general_functions');

module.exports = async (name, description, { mixCategoryRepository }) => {
  name = await convertUpperCase(name);
  //Validate that a record with the same name is not found.
  const validationName = await mixCategoryRepository.getByFilter({ name });
  if (validationName) return 484;
  if (validationName === false) return false;

  const category = new Category(null, name, description, {
    registerDate: generateCurrentDate(),
    updateDate: null
  });

  const resultCreateCategory = await mixCategoryRepository.persist(category);
  if (!resultCreateCategory) return false;
  return resultCreateCategory;
};
