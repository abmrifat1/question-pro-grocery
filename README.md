# 🛒 Grocery Management System

A robust NestJS-based REST API for managing grocery items and orders with role-based authentication (Admin/User).

## 📋 Table of Contents
- [🛒 Grocery Management System](#-grocery-management-system)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
    - [User Management](#user-management)
    - [Admin Capabilities](#admin-capabilities)
    - [User Capabilities](#user-capabilities)
    - [Technical Features](#technical-features)
  - [🛠 Tech Stack](#-tech-stack)
  - [📦 Prerequisites](#-prerequisites)
  - [🔧 Installation](#-installation)
    - [1. Clone the repository](#1-clone-the-repository)
    - [2. Install dependencies](#2-install-dependencies)
    - [3. Set up environment variables](#3-set-up-environment-variables)
    - [4. Create PostgreSQL database](#4-create-postgresql-database)
    - [Connect to PostgreSQL](#connect-to-postgresql)
    - [Create database and user](#create-database-and-user)
  - [🚀 Running the Application](#-running-the-application)
    - [Start in development mode with hot reload](#start-in-development-mode-with-hot-reload)
    - [Using Docker (Recommended)](#using-docker-recommended)
  - [🚀API endpoints](#api-endpoints)
      - [register \& login](#register--login)
    - [Grocery Endpoints](#grocery-endpoints)
    - [Order Endpoints](#order-endpoints)
  - [🔐 Authentication](#-authentication)
    - [JWT Token Flow](#jwt-token-flow)
    - [Token Format](#token-format)
  - [🧪 Testing](#-testing)

## ✨ Features

### User Management
- ✅ Register/Login with JWT authentication
- ✅ Role-based access control

### Admin Capabilities
- ✅ Add new grocery items
- ✅ View all grocery items
- ✅ Update grocery item details (name, price)
- ✅ Delete grocery items
- ✅ Manage inventory levels

### User Capabilities
- ✅ View available grocery items (in-stock only)
- ✅ Create orders with multiple items
- ✅ View personal order history


### Technical Features
- ✅ PostgreSQL database with Sequelize ORM
- ✅ JWT token-based authentication
- ✅ Role guards for route protection
- ✅ Docker containerization
- ✅ Transaction support for orders

## 🛠 Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT + bcrypt
- **Container**: Docker & Docker Compose
- **Testing**: Jest

## 📦 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (v14 or higher)
- Docker & Docker Compose (optional)

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/abmrifat1/question-pro-grocery.git
cd question-pro-grocery
```

### 2. Install dependencies

```bash
npm install
```
### 3. Set up environment variables
- cp .env.example .env

### 4. Create PostgreSQL database

### Connect to PostgreSQL
```bash
sudo -u postgres psql
```

### Create database and user
```bsh
CREATE DATABASE grocery_db;
CREATE USER grocery_user WITH ENCRYPTED PASSWORD 'grocery_pass';
GRANT ALL PRIVILEGES ON DATABASE grocery_db TO grocery_user;
\q
```

## 🚀 Running the Application

### Start in development mode with hot reload
```bsh
npm run start:dev

# Or start normally
npm run start

# Build for production
npm run build

# Run in production
npm run start:prod\
```

### Using Docker (Recommended)
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

## 🚀API endpoints

#### register & login
- POST	/api/auth/register	(Register new user)
- POST	/api/auth/login	(Login user)

### Grocery Endpoints
- POST	/api/grocery (Add new grocery item)	- Admin
- GET	/api/grocery (Get all grocery items) - Admin/User
- GET	/api/grocery/available	(Get in-stock items)	- Admin/User
- PATCH	/api/grocery/:id	(Update grocery item)	- Admin
- DELETE	/api/grocery/:id	(Delete grocery item)	- Admin
- PATCH	/api/grocery/:id/inventory	(Update inventory) - Admin

### Order Endpoints
- POST	/api/orders	(Create new order) - User
- GET	/api/orders	(Get user's orders) - User
- GET	/api/orders/:id	(Get a user's order details) - User

## 🔐 Authentication

### JWT Token Flow
- Register - Create a new user account
- Login - Receive JWT access token
- Authorize - Include token in subsequent requests
- Access - Role-based access to protected routes

### Token Format

```bash
Authorization: Bearer <your_jwt_token>
```

## 🧪 Testing
```bash
# Unit tests
npm test
```
