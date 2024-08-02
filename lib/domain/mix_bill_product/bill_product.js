'use strict';
module.exports = class {
  constructor(id, bill_id, product_id, number_products, info) {
    this.id = id;
    this.bill_id = bill_id;
    this.product_id = product_id;
    this.number_products = number_products;
    this.info = info;
  }
};
