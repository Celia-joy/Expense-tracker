import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    amount: { type: Number, required: true, min: 0 },
    category: {
        type: String,
        enum: ['food','transport','airtime','rent','utilities',
               'entertainment','health','education','clothing','shopping','savings','other'],
        required: true
    },
    method: { type: String, default: 'Cash' },
    currency: { type: String, default: 'RWF' },
    note: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Expenses = mongoose.model('Expenses', expenseSchema);
export default Expenses;
