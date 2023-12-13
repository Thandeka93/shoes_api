CREATE TABLE shoes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    colour VARCHAR (255) NOT NULL,
    size INT NOT NULL,
    price INT NOT NULL,
    in_stock INT NOT NULL,
    img_src VARCHAR(255) NOT NUll
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    status VARCHAR(255) NOT NULL,
    order_number VARCHAR(255),
    timestamp VARCHAR(255)
);

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES cart(id),
    shoe_id INT REFERENCES shoes(id),
    quantity INT NOT NULL
);