'use strict';
module.exports = class {
  constructor(id, site_id, client_id, employed_id, note, info) {
    this.id = id;
    this.site_id = site_id;
    this.client_id = client_id;
    this.employed_id = employed_id;
    this.note = note;
    this.info = info;
  }
};
