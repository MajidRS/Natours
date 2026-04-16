# 🌲 Natours API - Professional Tour Management System

A high-performance, production-ready RESTful API built for a nature tours application. This project demonstrates advanced backend concepts using **Node.js**, **Express**, and **MongoDB**, following the **MVC (Model-View-Controller)** architectural pattern.

---

## 🏗️ System Architecture & Features

This project is built with scalability and clean code in mind. Below is the current state of the implementation:

### ⚙️ Core Infrastructure (Phase 1)

- [x] **Modular Server Setup:** Separation of application logic (`app.js`) and server configuration (`server.js`).
- [x] **Global Error Management:** Centralized error handling for both operational and programming errors.
- [x] **Environment Safety:** Listeners for `uncaughtException` and `unhandledRejection` for graceful shutdowns.
- [x] **DevOps & DX:** Implementation of ESLint (Flat Config) and Prettier for automated code quality.

### 📊 Data Modeling (Phase 2 - Current)

- [ ] **Tours Schema:** Advanced Mongoose schemas with validations and virtual properties.
- [ ] **User Management:** Secure user schemas with password encryption.
- [ ] **Reviews & Ratings:** Implementation of Parent Referencing and Geospatial data.

### 🔒 Security & Authentication (Upcoming)

- [ ] **JWT Authentication:** Secure login, signup, and password reset functionality.
- [ ] **Authorization:** Role-based access control (User, Guide, Lead-Guide, Admin).
- [ ] **API Security:** Protection against NoSQL injection, XSS, and Rate Limiting.

---

## 🛠️ Tech Stack & Tools

| Category         | Technology           |
| :--------------- | :------------------- |
| **Runtime**      | Node.js (ES Modules) |
| **Framework**    | Express 5            |
| **Database**     | MongoDB & Mongoose   |
| **Validation**   | Validator.js         |
| **Code Quality** | ESLint, Prettier     |
| **Environment**  | Dotenv, Morgan       |

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** (Atlas or Local instance)

### 2. Installation

```bash
# Clone the repository
git clone [https://github.com/MajidRS/Natours.git](https://github.com/MajidRS/Natours.git)

# Install dependencies
npm install
```

### 3. Environment Configuration

Create a .env file in the root directory and add:
NODE_ENV=development
PORT=3000
DATABASE=your_mongodb_connection_string
DATABASE_PASSWORD=your_password

### 4. Run the Application

```bash
# Development mode (with Nodemon)
npm start

# Production mode
npm run start:prod

# Lint & Format
npm run lint
npm run format
```

---

📝 Project Methodology
This project follows a strict Mentor-Driven Approach:

Why over How: Every architectural decision is justified based on business requirements.

Strict Coding Standards: Clean code practices and automated linting.

Version Control: Systematic GitHub workflow using Feature Branches and Pull Requests.

---

👨‍💻 Author
MajidRS - Software Engineer
