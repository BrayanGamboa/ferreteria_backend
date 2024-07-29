'use strict';

const _serializeSingleProduct = (product) => {
  return {
    id: product.id || null,
    category_id: product.category_id,
    name: product.name,
    description: product.description,
    price: product.price,
    info: {
      updateDate: product?.info?.update_date || null,
      registerDate: product?.info?.register_date
    }
  };
};

module.exports = class {
  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleProduct);
    }
    return _serializeSingleProduct(data);
  }
};
