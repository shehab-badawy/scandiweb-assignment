# Scandiweb Full-Stack Store

A high-performance e-commerce application built for the Scandiweb Junior Developer assignment. This project features a React frontend, a PHP/GraphQL backend, and a MySQL database, all fully containerized and optimized for a low-resource production environment.

**🚀 Live Demo:** [https://164.92.137.136.sslip.io](https://164.92.137.136.sslip.io)

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), Apollo Client, CSS Modules |
| **Backend** | PHP, GraphQL (Custom Runtime), MySQL 8.0 |
| **Infrastructure** | Docker, Nginx (Reverse Proxy), Let's Encrypt (SSL) |
| **Deployment** | DigitalOcean Droplet (512MB RAM Optimized) |

---

## ✨ Features

- **Product Listing Page (PLP):**
  - Filterable categories (All, Clothes, Tech)
  - Instant "Quick Add" for products without mandatory attributes

- **Product Description Page (PDP):**
  - Dynamic attribute selection (Color, Size, Capacity)
  - Real-time validation and state management

- **Cart System:**
  - Persistent cart (Survives page refreshes via LocalStorage)
  - Interactive overlay for quantity adjustments and attribute verification
  - Seamless "Place Order" flow with automated cart clearing

- **Production-Ready Performance:**
  - React served as static assets via Nginx
  - No Node.js runtime needed in production to save memory

- **Responsive Design:**
  - Fully optimized for mobile, tablet, and desktop

---

## 🏗️ Architecture & Optimization

This deployment follows a professional **Reverse Proxy architecture** designed for low-resource environments (512MB RAM).

### Key Optimizations

1. **Nginx Integration**
   - Handles SSL termination
   - Serves frontend as static files directly
   - Proxies `/graphql` requests to the PHP-FPM/Docker backend

2. **Resource Management**
   - Custom `my.cnf` tuning for MySQL 8.0 to limit memory usage
   - Prevents Out Of Memory (OOM) crashes on small instances
   - Linux swap file configured as a safety net for peak traffic

3. **Automated Testing**
   - Passes **7/7 Scandiweb Playwright tests**
   - Full coverage for PLP, PDP, and Cart functionality (including `data-testid` requirements)

---

## 🚀 Local Setup

### 1. Prerequisites
- Docker & Docker Compose

### 2. Environment Configuration
To run the application locally, you must create `.env` files in the following directories to handle database credentials and API routing.

#### **Backend Configuration**
Create a file at `backend/.env`:
```env
# Database connection for PHP API
DB_HOST=YOUR_DB_HOST
DB_NAME=YOUR_DB_NAME
DB_USER=USERNAME
DB_PASS=PASSWORD

# Configuration for the MySQL Container
MYSQL_DATABASE=YOUR_DB_NAME
MYSQL_ROOT_PASSWORD=PASSWORD
```
#### **Frontend Configuration**
Create a file at `frontend/.env`:
```env
VITE_GRAPHQL_URI=http://localhost:8000/graphql
```

# Clone the repository
```bash
git clone [https://github.com/shehab-badawy/scandiweb-assignment.git](https://github.com/shehab-badawy/scandiweb-assignment.git)
cd scandiweb-store

# Launch all services in detached mode
docker-compose up -d
```
Once the containers are running:

Frontend: http://localhost:5173

GraphQL API: http://localhost:8000/graphql

Database: localhost:3306
