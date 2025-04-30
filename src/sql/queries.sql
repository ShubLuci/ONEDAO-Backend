CREATE TABLE users (
    email TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    user_status TEXT NOT NULL DEFAULT 'inactive',
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name TEXT NOT NULL,
    product_status TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMPTZ NOT NULL,
    "createdBy" TEXT NOT NULL,  
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedBy" TEXT NOT NULL,
    FOREIGN KEY("createdBy") REFERENCES users(email),
    FOREIGN KEY("updatedBy") REFERENCES users(email)
);