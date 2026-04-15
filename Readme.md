# 💰 Expense Tracker API

A RESTful API built with **Express.js** and **MongoDB** that allows users to register, log daily expenses, categorize them, view daily/weekly/monthly spending summaries, and receive email alerts when they exceed their monthly budget.

---

## 🧠 Business Rules

- A user must **register** and **login** before logging any expenses
- Each expense must belong to one of the allowed **categories**
- Users can optionally set a **monthly budget** at registration
- A **cron job** runs on the 1st of every month — if a user exceeded their budget the previous month, they receive an **email alert**
- Users can only view, edit, and delete **their own** expenses

---

## 🗄️ Data Models

### User

| Field | Type | Description |
|---|---|---|
| `name` | String | Full name of the user |
| `email` | String | Unique email address |
| `password` | String | Hashed password (bcryptjs) |
| `monthlyBudget` | Number | Optional budget limit for alert emails |

### Expense

| Field | Type | Description |
|---|---|---|
| `user` | ObjectId | Reference to the User |
| `title` | String | What the expense was for |
| `amount` | Number | Amount spent |
| `category` | String | One of the allowed categories |
| `note` | String | Optional extra description |
| `date` | Date | When it was spent (defaults to now) |

### Allowed Categories

`food` · `transport` · `airtime` · `rent` · `utilities` · `entertainment` · `health` · `education` · `clothing` · `savings` · `other`

---

## 🛣️ API Endpoints

### Auth

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive a JWT token |

### Expenses

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/expenses` | Protected | Log a new expense |
| GET | `/api/expenses` | Protected | Get all expenses (supports filters) |
| GET | `/api/expenses/:id` | Protected | Get a single expense |
| PUT | `/api/expenses/:id` | Protected | Update an expense |
| DELETE | `/api/expenses/:id` | Protected | Delete an expense |

#### Available Query Filters
```
GET /api/expenses?category=food
GET /api/expenses?startDate=2024-01-01&endDate=2024-01-31
GET /api/expenses?category=transport&startDate=2024-01-01
```

### Summary

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/summary/daily` | Protected | Total spent today |
| GET | `/api/summary/weekly` | Protected | Total spent in the last 7 days (broken down by day) |
| GET | `/api/summary/monthly` | Protected | Total + breakdown by category for the current month |

---

## 📁 Project Structure

```
expense-tracker/
│
├── config/
│   ├── env.js                      # Loads environment variables
│   └── mailer.js                   # Nodemailer — budget alert emails
│
├── Controllers/
│   ├── auth.controller.js          # Register & login logic
│   ├── expense.controller.js       # CRUD for expenses
│   └── summary.controller.js       # Daily / weekly / monthly summaries
│
├── Database/
│   └── mongodb.js                  # Mongoose connection
│
├── middleware/
│   ├── auth.middleware.js          # JWT verification (protect routes)
│   └── error.middleware.js         # Global error handler
│
├── Models/
│   ├── user.model.js
│   └── expense.model.js
│
├── Routes/
│   ├── auth.routes.js
│   ├── expense.routes.js
│   └── summary.routes.js
│
├── utils/
│   └── budgetAlert.js              # node-cron monthly overspend check
│
├── .env.development.local
├── .gitignore
├── app.js                          # Express app entry point
└── package.json
```

---

## ⚙️ Tech Stack

| Package | Purpose |
|---|---|
| `express` | Web framework |
| `mongoose` | MongoDB ODM — schemas and queries |
| `dotenv` | Load environment variables from `.env` |
| `bcryptjs` | Hash and compare passwords securely |
| `jsonwebtoken` | Create and verify JWT tokens for auth |
| `nodemailer` | Send budget alert emails |
| `node-cron` | Schedule monthly budget checks |
| `express-validator` | Validate and sanitize incoming request data |
| `nodemon` | Auto-restart server during development |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.development.local` file in the root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### 4. Run the development server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

---

## 🔐 Authentication

This API uses **JWT (JSON Web Tokens)** for authentication. After logging in, include the token in the `Authorization` header of all protected requests:

```
Authorization: Bearer <your_token_here>
```

---

## 📬 Budget Alerts

If a user sets a `monthlyBudget` during registration, a cron job runs on the **1st of every month at 8:00 AM**. It checks whether the user overspent the previous month and sends them an email breakdown showing how much they spent vs. their budget.

---

## 👤 Author

**Celia-joy**
Built as a hands-on learning project to master Express.js backend development.