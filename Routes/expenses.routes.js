import {Router} from 'express';
import authorize from '../middleware/auth.middleware.js';
import {createExpenses, getUserExpenses, getAllExpenses} from '../Controllers/expenses.controllers.js'

const expensesRouter = Router();

expensesRouter.post('/',authorize, createExpenses);

expensesRouter.get('/',authorize, getAllExpenses)

expensesRouter.get('/:id', (req, res)=>{
    res.send({title:'Get  expenses details'});
});

expensesRouter.put('/:id', (req, res)=>{
    res.send({title:'Update expenses'});
});

expensesRouter.delete('/:id', (req, res)=>{
    res.send({title:'Delete expenses'});
});

expensesRouter.get('/users/:id', authorize, getUserExpenses);

expensesRouter.put('/:id/cancel', (req, res)=>{
    res.send({title:'Cancel expenses'});
});

export default expensesRouter;
