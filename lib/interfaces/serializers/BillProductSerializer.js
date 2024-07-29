'use strict';

const _serializeSingleBillProduct = (bill_product) => {
  return {
    id: bill_product.id || null,
    bill_id: bill_product.bill_id,
    product_id: bill_product.product_id,
    info: {
      updateDate: bill_product?.info?.update_date || null,
      registerDate: bill_product?.info?.register_date
    }
  };
};

module.exports = class {
  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleBillProduct);
    }
    return _serializeSingleBillProduct(data);
  }
};
