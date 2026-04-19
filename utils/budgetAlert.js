import cron from 'node-cron';
import User from '../Models/user.model.js';
import Expense from '../Models/expenses.models.js';
import { sendBudgetAlertEmail, sendBudgetExceededEmail } from './emails.js';

// Runs at 8:00 AM on the 1st of every month
cron.schedule('0 8 1 * *', async () => {
    console.log('Running monthly budget check...');

    try {
        // STEP 1 — get last month's date range
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth(), 0);
        end.setHours(23, 59, 59, 999);

        // STEP 2 — find only users who have set a monthly budget
        const users = await User.find({ monthlyBudget: { $ne: null } });

        // STEP 3 — loop through each user
        for (const user of users) {

            // STEP 4 — get their expenses for last month
            const expenses = await Expense.find({
                user: user._id,
                date: { $gte: start, $lte: end }
            });

            // STEP 5 — calculate their total spending
            const total = expenses.reduce((sum, e) => sum + e.amount, 0);

            // STEP 6 — calculate what percentage of budget they used
            const percentageUsed = Math.round((total / user.monthlyBudget) * 100);
            const remainingBudget = user.monthlyBudget - total;
            const overBudgetAmount = total - user.monthlyBudget;

            // STEP 7 — send the right email based on spending level
            if (total > user.monthlyBudget) {
                // They exceeded the budget → send the serious alert
                await sendBudgetExceededEmail(user.email, user.name, {
                    budgetLimit: user.monthlyBudget,
                    currentSpending: total,
                    overBudgetAmount
                });
                console.log(`Budget exceeded email sent to ${user.email}`);

            } else if (percentageUsed >= 80) {
                // They used 80%+ of budget → send a warning
                await sendBudgetAlertEmail(user.email, user.name, {
                    budgetLimit: user.monthlyBudget,
                    currentSpending: total,
                    percentageUsed,
                    remainingBudget
                });
                console.log(`Budget warning email sent to ${user.email}`);
            }
        }

        console.log('Monthly budget check complete.');

    } catch (error) {
        console.error('Budget check failed:', error.message);
    }
});