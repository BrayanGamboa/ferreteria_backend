'use strict';

const _serializeSingleRole = (role) => {
  return {
    id: role.id || null,
    name: role.name,
    description: role.description,
    info: {
      updateDate: role?.info?.update_date || null,
      registerDate: role?.info?.register_date
    }
  };
};

module.exports = class {

  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleRole);
    }
    return _serializeSingleRole(data);
  }

};