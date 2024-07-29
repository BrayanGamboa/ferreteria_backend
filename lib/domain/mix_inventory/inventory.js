
"use strict";
module.exports = class {
    constructor(id, product_id, site_id, quantity, info) {
        this.id = id;
        this.product_id = product_id;
        this.site_id = site_id;
        this.quantity = quantity;
        this.info = info;
    }
};