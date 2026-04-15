import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 6,
        maxLength: 100
    },
    price:{
        type: Number,
        required: true,
        min: [0, 'Price must be greater than 0'],
    },
    currency:{
        type: String,
        enum: ['USD', 'RWF', 'GBP', 'EUR'],
        default: 'USD'
    },
    frequency:{
        type: String,
        enum: ['daily', 'weekly', 'monthly']
    },
    category:{
        type: String,
        enum: ['Rent','Airtime and internet','Clothing','Entertainment', 'Transport','Education', 'Health', 'Food', 'Saving']

    },
    
    
    startDate:{
        type: Date,
        required: true,
        validate:{
            validator: function(value) {   // ✅ regular function
                return value <= new Date();
            },
            message: 'Starting date must be in the past'
        }
    },
    renewalDate:{
        type: Date,
        validate:{
            validator: function(value) {  
                return value > this.startDate;
            },
            message: 'Renewal date must be after the starting date'
        }
    },
    user:{                                 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true
    }
},
{
    timestamps: true
});



const Expenses = mongoose.model('Expenses', expenseSchema);
export default Expenses;