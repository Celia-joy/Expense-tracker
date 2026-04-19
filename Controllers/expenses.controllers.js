import Expenses from '../Models/expenses.models.js';


export const createExpenses = async (req, res, next)=>{
    try{
        const expense = await Expenses.create({
            ...req.body,
            user: req.user._id
        });
        
        res.status(201).json({
            success: true,
            data: expense
        });
    }
    catch (error){
        next (error);
    }
}

export const getMyExpenses = async (req, res, next)=>{
    try{
        const Allexpenses = await Expenses.find({user: req.user._id});
        res.status(200).json({
            success:true,
            data: Allexpenses
        });
    }
    catch (error){
        next(error)
    }
}

export const updateExpense = async (req, res, next) => {
    try {
        const expense = await Expenses.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id }, // ← ensures ownership
            { $set: req.body },
            { new: true }
        );
        if (!expense) {
            const error = new Error('Expense not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: expense });
    } catch (error) {
        next(error);
    }
};

export const deleteExpense = async (req, res, next) => {
    try {
        const expense = await Expenses.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id // ← ensures ownership
        });
        if (!expense) {
            const error = new Error('Expense not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ success: true, message: 'Expense deleted' });
    } catch (error) {
        next(error);
    }
};
