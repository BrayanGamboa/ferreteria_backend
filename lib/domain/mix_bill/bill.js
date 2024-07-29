
"use strict";
module.exports = class {
    constructor(id, site_id, client_id, employee_id, name, description, info) {
        this.id = id;
        this.site_id = site_id;
        this.client_id = client_id;
        this.employee_id = employee_id;
        this.name = name;
        this.description = description;
        this.info = info;
    }
};