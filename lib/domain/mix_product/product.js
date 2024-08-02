'use strict';
module.exports = class {
  constructor(id, category_id, name, description, price, info) {
    this.id = id;
    this.category_id = category_id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.info = info;
  }
};
