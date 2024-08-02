'use strict';

const _serializeSingleSite = (site) => {
  return {
    id: site.id || null,
    name: site.name,
    address: site.address,
    number_phone: site.number_phone,
    info: {
      updateDate: site?.info?.update_date || null,
      registerDate: site?.info?.register_date
    }
  };
};

module.exports = class {
  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleSite);
    }
    return _serializeSingleSite(data);
  }
};
