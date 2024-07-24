module.exports = class {
  constructor(id, role_id, document_type_id, name, last_name, email, date_birthday, info) {
    this.id = id;
    this.role_id = role_id;
    this.document_type_id = document_type_id;
    this.name = name;
    this.last_name = last_name;
    this.email = email;
    this.date_birthday = date_birthday;
    this.info = info;
  }
};