'use strict';

const _serializeSingleBill = (bill) => {
  return {
    id: bill.id || null,
    site_id: bill.site_id,
    client_id: bill.client_id,
    employed_id: bill.employed_id,
    note: bill.note,
    info: {
      updateDate: bill?.info?.update_date || null,
      registerDate: bill?.info?.register_date
    }
  };
};

module.exports = class {
  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleBill

      );
    }
    return _serializeSingleBill(data);
  }

};