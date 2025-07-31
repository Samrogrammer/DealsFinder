CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE deal (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    original_price DECIMAL(10,2),
    deal_price DECIMAL(10,2),
    affiliate_link VARCHAR(500),
    category_id INTEGER REFERENCES category(id),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_category_id ON deal(category_id);
CREATE INDEX idx_created_at ON deal(created_at);
CREATE INDEX idx_is_active ON deal(is_active);
