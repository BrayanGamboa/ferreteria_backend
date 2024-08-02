'use strict';

const _serializeSingleDocumentType = (documentType) => {
  return {
    id: documentType.id || null,
    name: documentType.name,
    description: documentType.description,
    info: {
      updateDate: documentType?.info?.update_date || null,
      registerDate: documentType?.info?.register_date
    }
  };
};

module.exports = class {
  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleDocumentType);
    }
    return _serializeSingleDocumentType(data);
  }
};
