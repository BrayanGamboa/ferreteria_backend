-- Crear esquemas
CREATE SCHEMA auth;
CREATE SCHEMA mix;
CREATE SCHEMA master;
-- Crear secuencias
CREATE SEQUENCE auth.auth_role_seq;
CREATE SEQUENCE master.master_document_type_seq;
CREATE SEQUENCE mix.mix_site_seq;
CREATE SEQUENCE mix.mix_category_seq;
CREATE SEQUENCE mix.mix_product_seq;
CREATE SEQUENCE mix.mix_inventory_seq;
CREATE SEQUENCE mix.mix_bill_seq;
CREATE SEQUENCE mix.mix_bill_product_seq;
-- Crear tablas
CREATE TABLE auth.auth_role(
    id INTEGER DEFAULT nextval('auth.auth_role_seq'),
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    info JSON NOT NULL,
    CONSTRAINT auth_role_pk PRIMARY KEY (id),
    CONSTRAINT auth_role_name_uq UNIQUE (name)
);
CREATE TABLE master.master_document_type(
    id INTEGER DEFAULT nextval('master.master_document_type_seq'),
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    info JSON NOT NULL,
    CONSTRAINT master_document_type_pk PRIMARY KEY (id),
    CONSTRAINT master_document_type_name_uq UNIQUE (name)
);
CREATE TABLE auth.auth_user(
    id INTEGER,
    role_id INTEGER NOT NULL,
    document_type INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    date_birthday DATE NOT NULL,
    info JSON NOT NULL,
    CONSTRAINT auth_user_pk PRIMARY KEY (id),
    CONSTRAINT auth_user_role_id_fk FOREIGN KEY (role_id) REFERENCES auth.auth_role (id),
    CONSTRAINT auth_user_document_type_fk FOREIGN KEY (document_type) REFERENCES master.master_document_type (id),
    CONSTRAINT auth_user_email_uq UNIQUE (email)
);
CREATE TABLE mix.mix_site(
    id INTEGER DEFAULT nextval('mix.mix_site_seq'),
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    number_phone VARCHAR(50) [],
    info JSON NOT NULL,
    CONSTRAINT mix_site_pk PRIMARY KEY (id)
);
CREATE TABLE mix.mix_category(
    id INTEGER DEFAULT nextval('mix.mix_category_seq'),
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    info JSON NOT NULL,
    CONSTRAINT mix_category_pk PRIMARY KEY (id)
);
CREATE TABLE mix.mix_product(
    id INTEGER DEFAULT nextval('mix.mix_product_seq'),
    category_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    info JSON NOT NULL,
    CONSTRAINT mix_product_pk PRIMARY KEY (id),
    CONSTRAINT mix_product_category_id_fk FOREIGN KEY (category_id) REFERENCES mix.mix_category (id)
);
CREATE TABLE mix.mix_inventory(
    id INTEGER DEFAULT nextval('mix.mix_inventory_seq'),
    product_id INTEGER NOT NULL,
    site_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    info JSON NOT NULL,
    CONSTRAINT mix_inventory_pk PRIMARY KEY (id),
    CONSTRAINT mix_inventory_product_id_fk FOREIGN KEY (product_id) REFERENCES mix.mix_product (id),
    CONSTRAINT mix_inventory_site_id_fk FOREIGN KEY (site_id) REFERENCES mix.mix_site (id)
);
CREATE TABLE mix.mix_bill(
    id INTEGER DEFAULT nextval('mix.mix_bill_seq'),
    product_id INTEGER NOT NULL,
    site_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    employed_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    info JSON NOT NULL,
    CONSTRAINT mix_bill_pk PRIMARY KEY (id),
    CONSTRAINT mix_bill_product_id_fk FOREIGN KEY (product_id) REFERENCES mix.mix_product (id),
    CONSTRAINT mix_bill_site_id_fk FOREIGN KEY (site_id) REFERENCES mix.mix_site (id),
    CONSTRAINT mix_bill_client_id_fk FOREIGN KEY (client_id) REFERENCES auth.auth_user (id),
    CONSTRAINT mix_bill_employed_id_fk FOREIGN KEY (employed_id) REFERENCES auth.auth_user (id)
);
CREATE TABLE mix.mix_bill_product(
    id INTEGER DEFAULT nextval('mix.mix_bill_product_seq'),
    bill_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    info JSON NOT NULL,
    CONSTRAINT mix_bill_product_pk PRIMARY KEY (id),
    CONSTRAINT mix_bill_product_bill_id_fk FOREIGN KEY (bill_id) REFERENCES mix.mix_bill (id),
    CONSTRAINT mix_bill_product_product_id_fk FOREIGN KEY (product_id) REFERENCES mix.mix_product (id)
);

ALTER TABLE mix.mix_product
ADD CONSTRAINT mix_product_validation_price CHECK (price > 0);
ALTER TABLE mix.mix_inventory
ADD CONSTRAINT mix_inventory_validation_quantity CHECK (quantity >= 0);