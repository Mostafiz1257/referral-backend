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

> ⚠️ **Important:** Never commit your `.env` file to version
