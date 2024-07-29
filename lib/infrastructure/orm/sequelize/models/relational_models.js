"use strict";
const sequelize = require('../sequelize');
const initModels = require('../models/init-models');

const {
    auth_user,
    auth_role,
    master_document_type,
    mix_category,
    mix_site,
    mix_bill,
    mix_bill_product,
    mix_inventory,
    mix_product
} = initModels(sequelize);

module.exports = {
    auth_user,
    auth_role,
    master_document_type,
    mix_category,
    mix_site,
    mix_bill,
    mix_bill_product,
    mix_inventory,
    mix_product
};
