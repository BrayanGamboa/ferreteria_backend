'use strict';

const _serializeSingleInventory = (inventory) => {
  return {
    id: inventory.id || null,
    product_id: inventory.product_id,
    site_id: inventory.site_id,
    quantity: inventory.quantity,
    info: {
      updateDate: inventory?.info?.update_date || null,
      registerDate: inventory?.info?.register_date
    }
  };
};

module.exports = class {
  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleInventory);
    }
    return _serializeSingleInventory(data);
  }
};
