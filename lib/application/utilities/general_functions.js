const {FORMAT_DATE} = require('../../infrastructure/config/constants');
const moment = require('moment-timezone');

exports.isObject = (object) => {
    try {
        if (
            typeof object === 'object' &&
            !Array.isArray(object) &&
            new Date(object).toString() === 'Invalid Date'
        ) {
            return true;
        } else return false;
    } catch (err) {
        return false;
    }
};
//Convert the object keys in format snake case
exports.convertCamelToSnakeCase = (object) => {
    let result = {};
    if (Array.isArray(object)) {
        result = object.map(this.convertCamelToSnakeCase);
    } else if (this.isObject(object)) {
        for (const property in object) {
            const newProperty = property.replace(
                /[A-Z]/g,
                (letter) => `_${letter.toLowerCase()}`
            );
            if (this.isObject(object[property])) {
                result[newProperty] = this.convertCamelToSnakeCase(object[property]);
            } else if (Array.isArray(object[property])) {
                result[newProperty] = object[property].map(
                    this.convertCamelToSnakeCase
                );
            } else {
                result[newProperty] = object[property];
            }
        }
    } else {
        result = object;
    }
    return result;
};

exports.generateCurrentDate = () => {
    return moment().utc().format(FORMAT_DATE);
};

exports.convertUpperCase = (text) =>{
    return text.toUpperCase();
}