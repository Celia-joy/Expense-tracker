import express from 'express';
import path from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';

import { PORT } from './config/env.js';
import userRouter from './Routes/user.routes.js';
import authRouter from './Routes/auth.routes.js';
import expensesRouter from './Routes/expenses.routes.js';
import summaryRouter from './Routes/summary.routes.js';
import './utils/budgetAlert.js';
import connectToDatabase from './Database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==================== CORS CONFIG ====================
const allowedOrigins = [
    'http://localhost:5000',
    'http://127.0.0.1:5000',
    'http://localhost:3000',
    'https://chretien527.github.io',
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 204
}));

// Test route - placed right after CORS
app.get('/test-cors', (req, res) => {
    res.json({ 
        message: "CORS is working! ✅",
        origin: req.headers.origin || "No origin"
    });
});

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/expenses', expensesRouter);
app.use('/api/v1/summary', summaryRouter);

// Frontend build path
const frontendBuildPath = [
    process.env.FRONTEND_BUILD_DIR && path.resolve(process.env.FRONTEND_BUILD_DIR),
    path.resolve(__dirname, 'build'),
    path.resolve(__dirname, 'public'),
    path.resolve(__dirname, '../../frontend/spend-smart/build'),
    path.resolve(__dirname, '../frontend/spend-smart/build')
].filter(Boolean).find(candidate => existsSync(candidate));

app.get('/', (req, res) => {
    if (frontendBuildPath) {
        return res.sendFile(path.join(frontendBuildPath, 'index.html'));
    }
    res.send("Welcome to the Expense tracker API");
});

if (frontendBuildPath) {
    app.use(express.static(frontendBuildPath));
    app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(path.join(frontendBuildPath, 'index.html'));
    });
}

app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await connectToDatabase();
});