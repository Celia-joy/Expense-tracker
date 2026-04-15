import Expenses from '../Models/expenses.models.js';


export const createExpenses = async (req, res, next)=>{
    try{
        const expense = await Subscription.create({
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
export const getUserExpenses = async(req, res, next)=>{
    try {
        if(req.user.id != req.params.id){
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }
        const expenses = await Subscription.find({user: req.params.id});
        res.status(200).json({
            success:true,
            data: expenses
        });

    }
    catch(error){
        next(error);
    }

}
export const getAllExpenses = async (req, res, next)=>{
    try{
        const Allexpenses = await Subscription.find();
        res.status(200).json({
            success:true,
            data: Allexpenses
        });
    }
    catch (error){
        next(error)
    }
}
