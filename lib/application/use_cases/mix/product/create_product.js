'use strict';

const Product = require('../../../../domain/mix_product/product');
const {
  generateCurrentDate,
  convertUpperCase
} = require('../../../utilities/general_functions');

module.exports = async (
  category_id,
  name,
  description,
  price,
  { mixProductRepository, mixCategoryRepository }
) => {
  name = await convertUpperCase(name);
  //Validate that a record with the same name is not found.
  const validationName = await mixProductRepository.getByFilter({ name });
  if (validationName) return 484;
  if (validationName === false) return false;

  //Validate if category exists in the database
  const validationCategory = await mixCategoryRepository.getByFilter({
    id: category_id
  });
  if (validationCategory === null) return 432;
  if (validationCategory === false) return false;

  const product = new Product(null, category_id, name, description, price, {
    registerDate: generateCurrentDate(),
    updateDate: null
  });

  const resultCreateProduct = await mixProductRepository.persist(product);
  return resultCreateProduct ? resultCreateProduct : false;
};
