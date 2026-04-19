# 💰 Expense Tracker API

A RESTful API built with **Express.js** and **MongoDB** that allows users to register, log daily expenses, categorize them, view daily/weekly/monthly spending summaries, and receive email alerts when they exceed their monthly budget.

---

## 🧠 Business Rules

- A user must **register** and **login** before logging any expenses
- Each expense must belong to one of the allowed **categories**
- Users can optionally set a **monthly budget** at registration
- A **cron job** runs on the 1st of every month — if a user exceeded their budget the previous month, they receive a **budget exceeded email**
- If a user has used **80% or more** of their budget, they receive a **budget warning email**
- Users can only view, edit, and delete **their own** expenses
- A **welcome email** is sent automatically when a user registers

---

## 🗄️ Data Models

### User

| Field | Type | Description |
|---|---|---|
| `name` | String | Full name of the user (min 6, max 100 chars) |
| `email` | String | Unique email address |
| `password` | String | Hashed password (bcryptjs, min 6 chars) |
| `monthlyBudget` | Number | Optional budget limit for alert emails |

### Expense

| Field | Type | Description |
|---|---|---|
| `user` | ObjectId | Reference to the User |
| `title` | String | What the expense was for |
| `amount` | Number | Amount spent (must be positive) |
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
| POST | `/api/v1/auth/sign-up` | Public | Register a new user + receive welcome email |
| POST | `/api/v1/auth/sign-in` | Public | Login and receive a JWT token |
| POST | `/api/v1/auth/sign-out` | Public | Sign out (client deletes token) |

### Users

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/v1/users` | Protected | Get all users |
| GET | `/api/v1/users/:id` | Protected | Get a single user by ID |

### Expenses

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/v1/expenses` | Protected | Log a new expense |
| GET | `/api/v1/expenses` | Protected | Get all my expenses |
| PUT | `/api/v1/expenses/:id` | Protected | Update an expense (only owner) |
| DELETE | `/api/v1/expenses/:id` | Protected | Delete an expense (only owner) |

### Summary

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/v1/summary/daily` | Protected | Total spent today |
| GET | `/api/v1/summary/weekly` | Protected | Total spent in the last 7 days |
| GET | `/api/v1/summary/monthly` | Protected | Total + breakdown by category for the current month |

---

## 📁 Project Structure

```
expense-tracker/
│
├── config/
│   ├── env.js                        # Loads environment variables
│   └── mailer.js                     # Nodemailer transporter setup
│
├── Controllers/
│   ├── auth.controllers.js           # signUp, signIn, signOut
│   ├── expenses.controllers.js       # createExpenses, getMyExpenses, updateExpense, deleteExpense
│   ├── summary.controllers.js        # getDailySummary, getWeeklySummary, getMonthlySummary
│   └── user.controllers.js           # getUsers, getUser
│
├── Database/
│   └── mongodb.js                    # Mongoose connection
│
├── middleware/
│   ├── auth.middleware.js            # JWT verification (protect routes)
│   └── error.middleware.js           # Global error handler
│
├── Models/
│   ├── user.model.js                 # User schema
│   └── expenses.models.js            # Expense schema
│
├── Routes/
│   ├── auth.routes.js                # /api/v1/auth
│   ├── expenses.routes.js            # /api/v1/expenses
│   ├── summary.routes.js             # /api/v1/summary
│   └── user.routes.js                # /api/v1/users
│
├── utils/
│   ├── budgetAlert.js                # node-cron monthly budget check
│   ├── emails.js                     # sendBudgetAlertEmail, sendBudgetExceededEmail
│   └── welcome.js                    # sendWelcomeEmail
│
├── .env.development
├── .gitignore
├── app.js                            # Express app entry point
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
| `nodemailer` | Send welcome and budget alert emails |
| `node-cron` | Schedule monthly budget checks |
| `express-validator` | Validate and sanitize incoming request data |
| `nodemon` | Auto-restart server during development |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Celia-joy/Expense-tracker.git
cd Expense-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.development` file in the root:

```
PORT=6500
NODE_ENV=development
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

> ⚠️ For `EMAIL_PASS`, use a Gmail **App Password**, not your real Gmail password.
> Generate one at: https://myaccount.google.com/apppasswords

### 4. Run the development server

```bash
npm run dev
```

The server will start on `http://localhost:6500`

---

## 🔐 Authentication

This API uses **JWT (JSON Web Tokens)** for authentication. After signing in, include the token in the `Authorization` header of all protected requests:

```
Authorization: Bearer <your_token_here>
```

---

## 📬 Email Notifications

### Welcome Email
Sent automatically when a user registers successfully.

### Budget Warning Email
Sent on the **1st of every month at 8:00 AM** if the user spent **80% or more** of their monthly budget the previous month.

### Budget Exceeded Email
Sent on the **1st of every month at 8:00 AM** if the user **exceeded** their monthly budget the previous month, showing exactly how much they overspent.

> Budget emails are only sent to users who have set a `monthlyBudget` in their profile.

---

## 👤 Author

**Celia-joy**
Built as a hands-on learning project to master Express.js backend development.