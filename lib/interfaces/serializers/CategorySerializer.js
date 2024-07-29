'use strict';

const _serializeSingleCategory = (category) => {
  return {
    id: category.id || null,
    name: category.name,
    description: category.description,
    info: {
      updateDate: category?.info?.update_date || null,
      registerDate: category?.info?.register_date
    }
  };
};

module.exports = class {
  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleCategory);
    }
    return _serializeSingleCategory(data);
  }

};