# 🛒 Grocery Management System

A robust NestJS-based REST API for managing grocery items and orders with role-based authentication (Admin/User).

## 📋 Table of Contents
- [🛒 Grocery Management System](#-grocery-management-system)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
    - [Admin Capabilities](#admin-capabilities)
    - [User Capabilities](#user-capabilities)
    - [Technical Features](#technical-features)
  - [🛠 Tech Stack](#-tech-stack)
  - [📦 Prerequisites](#-prerequisites)
  - [🔧 Installation](#-installation)
    - [1. Clone the repository](#1-clone-the-repository)

## ✨ Features

### Admin Capabilities
- ✅ Add new grocery items
- ✅ View all grocery items
- ✅ Update grocery item details (name, price)
- ✅ Delete grocery items
- ✅ Manage inventory levels

### User Capabilities
- ✅ Register/Login with JWT authentication
- ✅ View available grocery items (in-stock only)
- ✅ Create orders with multiple items
- ✅ View personal order history
- ✅ Role-based access control

### Technical Features
- ✅ PostgreSQL database with Sequelize ORM
- ✅ JWT token-based authentication
- ✅ Role guards for route protection
- ✅ Docker containerization
- ✅ Health check endpoints
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
git clone https://github.com/yourusername/grocery-management-system.git
cd grocery-management-system