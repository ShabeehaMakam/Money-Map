import express from 'express';

import {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel
} from '../controllers/expenseController.js';

import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Routes with authentication protection
router.post('/add', protect, addExpense);
router.get('/get', protect, getAllExpense);
router.get('/downloadexcel', protect, deleteExpense);
router.delete('/:id', protect,   downloadExpenseExcel
);

export default router;
