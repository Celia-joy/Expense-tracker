import {Router} from 'express';
import authorize from '../middleware/auth.middleware.js';
import { getDailySummary, getWeeklySummary, getMonthlySummary } from "../Controllers/summary.controllers.js";

const summaryRouter = Router();
summaryRouter.get('/daily', authorize, getDailySummary);
summaryRouter.get('/weekly', authorize, getWeeklySummary);
summaryRouter.get('/monthly', authorize, getMonthlySummary);

export default summaryRouter;