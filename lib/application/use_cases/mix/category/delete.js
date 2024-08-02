'use strict';

module.exports = async (
  id,
  { mixCategoryRepository, mixProductRepository }
) => {
  const validationExist = await mixCategoryRepository.getByFilter({ id });
  if (validationExist) return 432;

  //Validate if the category id is present in some products
  const validationCategoryProducts = await mixProductRepository.getByFilter({
    category_id: id
  });
  return validationCategoryProducts
    ? 441
    : await mixCategoryRepository.remove(id);
};
