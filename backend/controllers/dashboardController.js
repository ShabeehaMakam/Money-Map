import Income from '../models/Income.js';
import Expense from '../models/Expense.js';
import { isValidObjectId, Types } from 'mongoose';
import  Transaction  from 'mongodb';

// Add Expense
export const getDashboardData = async (req, res) => {
    const userId = req.user.id;
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },

        ]);
        console.log("totalIncome", { totalincome, userId: isValidObjectId(userId) });

        const totalExpense = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },

        ]);
        //get income transaction in the last 60 days     
        const last60DaysIncomeTransactions = await  Income.find({
            userId,
            date:{ $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
        (sum, Transaction) => sum + Transaction.amount,
        0
    );
    const last30DaysExpenseransactions = await Expense.find({
        userId,
         date:{ $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });
//get toal expense for last 30 days 
const expenseLast30Days = last30DaysExpenseransactions.reduse(
    (sum,transactions)=> sum+transaction.amount,
0);

//fetch last 5 transactions (income  expense)
const lastTransactions=[
    ...(await Income.find({userId}).sor({date:-1}).limit(5)).map(
        (txn)=>({
            ...txn.oObject(),
            type:"income",

        })

    ),
    ...(await Expense.find({userId}).sort({date:-1}).limit(5)).map(
        (txn)=>({
            ...txn.toObject(),
            type:"expense",

        })
    ),

].sort((a,b)=>b.date -a.date);

//final response
res.json({
    totalBalance:
    (totalIncome[0]?.total || 0)-(totalExpense[0]?.total || 0),
    totalIncome: totalIncome[0]?.total || 0,
        totalExpense: totalExpense[0]?.total || 0,
        last30DaysExpense:{

            total:expensesLast30Days,
            transactions: last30DaysExpenseTransactions,

        },
        last60DaysIncome:{
            total:incomeLast60Days,
            transactions: last60DaysIncomeTransactions,

        },
        recentTransactions:latTransctions,

});
}

  catch (error) {
    res.status(500).json({ message: "Server Error",error });
}
};

