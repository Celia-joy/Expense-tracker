import transporter from '../config/mailer.js';

export const sendBudgetAlertEmail = async (email, name, budgetData) => {
    const { category, budgetLimit, currentSpending, percentageUsed, remainingBudget } = budgetData;

    const mailerOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Budget Alert: ${category} spending at ${percentageUsed}%`,
        html: `...your html...`
    };

    try {
        await transporter.sendMail(mailerOptions);
        console.log(`Budget alert sent to ${email}`);
    } catch (error) {
        console.log(`Budget alert failed: ${error}`);
        throw error;
    }
};

export const sendBudgetExceededEmail = async (email, name, budgetData) => {
    const { category, budgetLimit, currentSpending, overBudgetAmount } = budgetData;

    const mailerOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Budget Exceeded: ${category} spending over limit!`,
        html: `...your html...`
    };

    try {
        await transporter.sendMail(mailerOptions);
        console.log(`Budget exceeded alert sent to ${email}`);
    } catch (error) {
        console.log(`Budget exceeded email failed: ${error}`);
        throw error;
    }
};