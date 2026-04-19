import Expense from '../Models/expenses.models.js';
export const getDailySummary = async (req, res, next) => {
    try {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999); 

        const expenses = await Expense.find({
            user: req.user._id,
            date: {
                $gte: start,
                $lte: end
            }
        });
        const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
        res.status(200).json({
            success:true,
            data:{
                total: totalExpenses,
                count: expenses.length,
                expenses: expenses
            }
        });    
    } 
    catch (error) {
        next(error);    
    }
}

export const getWeeklySummary = async (req, res,next)=>{
    try{
        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const start = new Date();
        start.setDate(start.getDate() - 6);
        start.setHours(0, 0, 0, 0);

        const expenses = await Expense.find({
            user: req.user._id,
            date: {
                $gte: start,
                $lte: end
            }
        });
        const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
        res.status(200).json({
            success:true,
            data:{
                total: totalExpenses,
                count: expenses.length,
                expenses: expenses
            }
        });  


    }
    catch(error){
        next(error);
    }
}

export const getMonthlySummary = async (req, res, next)=>{
    try{
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);

        const expenses = await Expense.find({
            user: req.user._id,
            date: {
                $gte: start,
                $lte: end
            }
        });

        const byCategory = {};
        expenses.forEach((e) => {
            byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
        });
        const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
        res.status(200).json({
            success:true,
            data:{
                total: totalExpenses,
                count: expenses.length,
                byCategory: byCategory,
                expenses: expenses
            }
        }); 


    }
    catch(error){
        next(error);
    }
}