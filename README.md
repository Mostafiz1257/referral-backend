# 🧠 Referral Backend - Node.js + Express + MongoDB

A robust **backend server** for the Referral System, built with **Node.js**, **Express.js**, and **MongoDB**.  
Provides secure RESTful APIs for authentication, user management, referral tracking, and data handling.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Bcrypt for password hashing
- **Environment:** dotenv for configuration

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Mostafiz1257/referral-frontend.git
cd referral-frontend
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

---

## 🔧 Environment Configuration

### 1. Create Environment File

Create a `.env` file in the root directory:

```bash
touch .env
```

### 2. Add Environment Variables

Copy and paste the following into your `.env` file:

```env
# Application Environment
NODE_ENV=development

# Server Configuration
PORT=5000

# Database Configuration
DATABASE_URL=mongodb://localhost:27017/referral-db
# Or for MongoDB Atlas:
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/referral-db

# Security Configuration
BCRYPT_SALT_ROUND=10

# JWT Configuration
JWT_ACCESS_SECRET=your_super_secret_jwt_key_here
JWT_ACCESS_EXPIRES_IN=15d
```

### 3. Configuration Details

| Variable                | Description                      | Example                                 |
| ----------------------- | -------------------------------- | --------------------------------------- |
| `NODE_ENV`              | Application environment          | `development` or `production`           |
| `PORT`                  | Server port number               | `5000`                                  |
| `DATABASE_URL`          | MongoDB connection string        | `mongodb://localhost:27017/referral-db` |
| `BCRYPT_SALT_ROUND`     | Salt rounds for password hashing | `10`                                    |
| `JWT_ACCESS_SECRET`     | Secret key for JWT signing       | `mySecretKey123!`                       |
| `JWT_ACCESS_EXPIRES_IN` | JWT token expiration time        | `15d`, `24h`, `30m`                     |

> ⚠️ **Important:** Never commit your `.env` file to version control. Add it to `.gitignore`.

---

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

---

## 📡 API Documentation

**Base URL:** `http://localhost:5000/api/v1`

---

## 🔐 Authentication

### User Registration

**POST** `/api/v1/users/register`

```json
{
  "name": "MOstasdfsfgfdfdgsddgsdsdffghfgfiz",
  "email": "johnfgsdgfdfdghfddfdhgfhfdsf@edsfsdxample.com",
  "password": "passwdfgddsdfgsdffsfofrfghd123"
}
```

### User Login

**POST** `/api/v1/users/login`

```json
{
  "email": "johnfgsdgfdfdgfddfdhgfhfdsf@edsfsdxample.com",
  "password": "passwdfgddsdfgsdffsfofrfghd123"
}
```

---

## 👤 User Management

### Get User Details

**GET** `/api/v1/users/:userId`

Example: `/api/v1/users/68ffa79593907172c462a9cf`

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

---

## 🛒 Purchase Management

### Create Purchase

**POST** `/api/v1/purchase`

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**

```json
{
  "userId": "68fc9e4cdf42d42c578aefea",
  "productId": "68fc9fc1df42d42c578aeff2"
}
```

---

## 📦 Product Management

### Add Product

**POST** `/api/v1/products`

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**

```json
{
  "name": "Story Book",
  "price": 3,
  "description": "A comprehensive guide for Story Book."
}
```

### Get Single Product

**GET** `/api/v1/products/:productId`

Example: `/api/v1/products/68fc9fc1df42d42c578aeff2`

### Get All Products

**GET** `/api/v1/products`

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sort` (optional): Sort order (e.g., `price`, `-price`)

---

## 🔒 Authentication & Authorization

Most endpoints require JWT authentication. Include the token in headers:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📊 Error Handling

### Common HTTP Status Codes

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Created               |
| 400         | Bad Request           |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Not Found             |
| 500         | Internal Server Error |

---

## 🗂️ Project Structure

```
referral-backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middlewares/     # Custom middlewares
│   ├── utils/           # Utility functions
│   └── app.js           # Express app setup
├── .env                 # Environment variables (not in git)
├── .env.example         # Example environment file
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies
└── README.md            # This file
```

---

## 🧪 Testing

```bash
npm test
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
