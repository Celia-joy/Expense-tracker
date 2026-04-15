import express from 'express';
import {PORT} from './config/env.js';
import userRouter from './Routes/user.routes.js';
import authRouter from './Routes/auth.routes.js';
import connectToDatabase from './Database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use(errorMiddleware);


app.get('/', (req, res)=>{
    res.send("Welcome to the Expense tracker API");
});

app.listen(PORT, async()=>{
    console.log(`Server running on http://localhost:${PORT}`);
    await connectToDatabase();
});