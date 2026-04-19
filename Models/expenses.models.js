import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    category: {
        type: String,
        enum: ['food','transport','airtime','rent','utilities',
               'entertainment','health','education','clothing','savings','other'],
        required: true
    },
    note: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Expenses = mongoose.model('Expenses', expenseSchema);
export default Expenses;