'use strict';

module.exports = class {
  persist(domain_inventory) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  update(id, fields) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  remove(id) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getByFilter(filter) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
};
