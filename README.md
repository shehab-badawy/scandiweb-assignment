# Scandiweb Full-Stack Store

A high-performance e-commerce application built for the Scandiweb Junior Developer assignment. This project features a React frontend, a PHP/GraphQL backend, and a MySQL database, all fully containerized and optimized for a low-resource production environment.

**🚀 Live Demo:** https://164.92.137.136.sslip.io

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
  - Persistent cart
  - Interactive overlay for quantity adjustments and attribute verification

- **Production-Ready Performance:**
  - React served as static assets via Nginx
  - No Node.js runtime needed in production

- **Responsive Design:**
  - Fully optimized for mobile, tablet, and desktop

---

## 🏗️ Architecture & Optimization

This deployment follows a professional **Reverse Proxy architecture** designed for low-resource environments (512MB RAM).

### Key Optimizations

1. **Nginx Integration**
   - Handles SSL termination
   - Serves frontend as static files
   - Proxies `/graphql` requests to backend

2. **Resource Management**
   - Custom `my.cnf` tuning for MySQL 8.0
   - Prevents Out Of Memory (OOM) crashes
   - Linux swap file added for peak traffic

3. **Automated Testing**
   - Passes **7/7 Scandiweb Playwright tests**
   - Full coverage for:
     - PLP
     - PDP
     - Cart functionality

---

## 🚀 Local Setup

### Prerequisites

- Docker & Docker Compose

---

### Run the Application

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd scandiweb-store
docker-compose up -d
