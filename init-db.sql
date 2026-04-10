-- init-db.sql
-- This script runs when PostgreSQL container starts for the first time

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant privileges to grocery_user
GRANT ALL PRIVILEGES ON DATABASE grocery_db TO grocery_user;

-- Create schema if not exists
CREATE SCHEMA IF NOT EXISTS public;

-- Grant schema privileges
GRANT USAGE ON SCHEMA public TO grocery_user;
GRANT CREATE ON SCHEMA public TO grocery_user;

-- Set default privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO grocery_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO grocery_user;

-- Create a test admin user (password: admin123)
-- Password hash: $2b$10$YourHashedPasswordHere
-- Uncomment and modify as needed
-- INSERT INTO "Users" (id, username, password, role, "createdAt", "updatedAt")
-- VALUES (gen_random_uuid(), 'admin', '$2b$10$YourHashedPasswordHere', 'admin', NOW(), NOW())
-- ON CONFLICT (username) DO NOTHING;