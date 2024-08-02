'use strict';

const _serializeSingleUser = (user) => {
  return {
    id: user.id,
    roleId: user.role_id,
    documentTypeId: user.document_type_id,
    name: user.name,
    lastName: user.last_name,
    email: user.email,
    dateBirthday: user.date_birthday,
    info: {
      updateDate: user?.info?.update_date || null,
      registerDate: user?.info?.register_date
    }
  };
};

module.exports = class {
  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleUser);
    }
    return _serializeSingleUser(data);
  }
};
