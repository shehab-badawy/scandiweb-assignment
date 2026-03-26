-- Disable foreign key checks to allow for a clean wipe if you rerun this
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS product_attribute_values, attribute_items, attribute_sets, prices, currencies, product_gallery, products, categories;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Categories
CREATE TABLE categories (
    name VARCHAR(255) PRIMARY KEY
);

-- 2. Products
CREATE TABLE products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    in_stock BOOLEAN DEFAULT TRUE,
    description TEXT,
    category_name VARCHAR(255),
    brand VARCHAR(255),
    FOREIGN KEY (category_name) REFERENCES categories(name) ON DELETE SET NULL
);

-- 3. Currencies
CREATE TABLE currencies (
    label VARCHAR(3) PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL
);

-- 4. Prices
CREATE TABLE prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    currency_label VARCHAR(3) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (currency_label) REFERENCES currencies(label) ON DELETE CASCADE
);


-- 5. Attribute Sets (The Types)
CREATE TABLE attributes (
    id VARCHAR(255) PRIMARY KEY, -- Internal ID: 'Size', 'Color'
    name VARCHAR(255) NOT NULL,  -- Display Name: 'Size', 'Capacity'
    type VARCHAR(50) NOT NULL    -- 'text', 'swatch'
);

-- 6. Attribute Items Library (Updated Foreign Key)
CREATE TABLE attribute_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attribute_id VARCHAR(255) NOT NULL, -- Renamed FK column
    display_value VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE CASCADE
);


-- 7. Product-Attribute Assignment (The "Order")
CREATE TABLE product_attribute_values (
    product_id VARCHAR(255) NOT NULL,
    attribute_item_id INT NOT NULL,
    PRIMARY KEY (product_id, attribute_item_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_item_id) REFERENCES attribute_items(id) ON DELETE CASCADE
);

-- 8. Product Gallery
CREATE TABLE product_gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);


-- Data populating

-- 1. Categories & Currencies (
INSERT INTO categories (name) VALUES ('all'), ('clothes'), ('tech');
INSERT INTO currencies (label, symbol) VALUES ('USD', '$');


-- 2. Attributes (Updated Table Name and added 'name' column)
INSERT INTO attributes (id, name, type) VALUES 
('Size', 'Size', 'text'), 
('Color', 'Color', 'swatch'), 
('Capacity', 'Capacity', 'text'),
('With USB 3 ports', 'With USB 3 ports', 'text'),
('Touch ID in keyboard', 'Touch ID in keyboard', 'text');


-- 4. Attribute Items Library (Updated FK column name)
INSERT INTO attribute_items (id, attribute_id, display_value, value) VALUES 
-- Sizes
(1, 'Size', '40', '40'), (2, 'Size', '41', '41'), (3, 'Size', '42', '42'), (4, 'Size', '43', '43'),
(5, 'Size', 'Small', 'S'), (6, 'Size', 'Medium', 'M'), (7, 'Size', 'Large', 'L'), (8, 'Size', 'Extra Large', 'XL'),
-- Colors
(9, 'Color', 'Green', '#44FF03'), (10, 'Color', 'Cyan', '#03FFF7'), (11, 'Color', 'Blue', '#030BFF'), (12, 'Color', 'Black', '#000000'), (13, 'Color', 'White', '#FFFFFF'),
-- Capacities
(14, 'Capacity', '512G', '512G'), (15, 'Capacity', '1T', '1T'), (16, 'Capacity', '256GB', '256GB'), (17, 'Capacity', '512GB', '512GB'),
-- Misc
(18, 'With USB 3 ports', 'Yes', 'Yes'), (19, 'With USB 3 ports', 'No', 'No'),
(20, 'Touch ID in keyboard', 'Yes', 'Yes'), (21, 'Touch ID in keyboard', 'No', 'No');

-- 5. Products
INSERT INTO products (id, name, in_stock, description, category_name, brand) VALUES 
('huarache-x-stussy-le', 'Nike Air Huarache Le', 1, '<p>Great sneakers for everyday use!</p>', 'clothes', 'Nike x Stussy'),
('jacket-canada-goosee', 'Jacket', 1, '<p>Awesome winter jacket</p>', 'clothes', 'Canada Goose'),
('ps-5', 'PlayStation 5', 1, '<p>A good gaming console...</p>', 'tech', 'Sony'),
('xbox-series-s', 'Xbox Series S 512GB', 0, '<div>Technical Description...</div>', 'tech', 'Microsoft'),
('apple-imac-2021', 'iMac 2021', 1, 'The new iMac!', 'tech', 'Apple'),
('apple-iphone-12-pro', 'iPhone 12 Pro', 1, 'This is iPhone 12.', 'tech', 'Apple'),
('apple-airpods-pro', 'AirPods Pro', 0, 'Audio description...', 'tech', 'Apple'),
('apple-airtag', 'AirTag', 1, 'Tracking description...', 'tech', 'Apple');

-- 6. Prices
INSERT INTO prices (product_id, currency_label, amount) VALUES 
('huarache-x-stussy-le', 'USD', 144.69),
('jacket-canada-goosee', 'USD', 518.47),
('ps-5', 'USD', 844.02),
('xbox-series-s', 'USD', 333.99),
('apple-imac-2021', 'USD', 1688.03),
('apple-iphone-12-pro', 'USD', 1000.76),
('apple-airpods-pro', 'USD', 300.23),
('apple-airtag', 'USD', 120.57);

-- 7. Product-Attribute Assignments
INSERT INTO product_attribute_values (product_id, attribute_item_id) VALUES 
('huarache-x-stussy-le', 1), ('huarache-x-stussy-le', 2), ('huarache-x-stussy-le', 3), ('huarache-x-stussy-le', 4),
('jacket-canada-goosee', 5), ('jacket-canada-goosee', 6), ('jacket-canada-goosee', 7), ('jacket-canada-goosee', 8),
('ps-5', 9), ('ps-5', 10), ('ps-5', 11), ('ps-5', 12), ('ps-5', 13), ('ps-5', 14), ('ps-5', 15),
('xbox-series-s', 9), ('xbox-series-s', 10), ('xbox-series-s', 11), ('xbox-series-s', 12), ('xbox-series-s', 13), ('xbox-series-s', 14), ('xbox-series-s', 15),
('apple-imac-2021', 16), ('apple-imac-2021', 17), ('apple-imac-2021', 18), ('apple-imac-2021', 19), ('apple-imac-2021', 20), ('apple-imac-2021', 21),
('apple-iphone-12-pro', 14), ('apple-iphone-12-pro', 15), ('apple-iphone-12-pro', 9), ('apple-iphone-12-pro', 10), ('apple-iphone-12-pro', 11), ('apple-iphone-12-pro', 12), ('apple-iphone-12-pro', 13);


-- 8. Gallery Images (Example for first two products)
INSERT INTO product_gallery (product_id, image_url) VALUES 
('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087'),
('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087'),
('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg');


-- Orders

-- 1. The main Order header
CREATE TABLE `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `total_amount` DECIMAL(10, 2) NOT NULL,
  `currency_label` VARCHAR(10) NOT NULL,
  `status` VARCHAR(20) DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. The specific items in that order
CREATE TABLE `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` VARCHAR(255) NOT NULL,
  `quantity` INT NOT NULL,
  `selected_attributes` JSON NOT NULL, 
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;