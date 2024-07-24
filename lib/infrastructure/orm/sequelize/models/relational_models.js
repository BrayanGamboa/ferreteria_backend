const sequelize = require('../sequelize');
const initModels = require('../models/init-models');

const {
    auth_user,
    auth_role,
    master_document_type
} = initModels(sequelize);

module.exports = {
    auth_user,
    auth_role,
    master_document_type
};
