import { Router } from 'express';
import authorize from '../middleware/auth.middleware.js';
import { createExpenses, getMyExpenses, updateExpense, deleteExpense } from '../Controllers/expenses.controllers.js';

const expensesRouter = Router();

expensesRouter.post('/', authorize, createExpenses);
expensesRouter.get('/', authorize, getMyExpenses);
expensesRouter.put('/:id', authorize, updateExpense);
expensesRouter.delete('/:id', authorize, deleteExpense);

export default expensesRouter;