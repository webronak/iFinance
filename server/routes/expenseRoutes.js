const express = require('express');
const router = express.Router();
const {
  getExpenses,
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense
} = require('../controllers/expenseController');
const userAuthMiddleware = require('../middlewares/userAuthMiddleware');

router.use(userAuthMiddleware);

router.get('/', getExpenses);

router.get('/:id', getExpense);

router.post('/', addExpense);

router.patch('/:id', updateExpense);

router.delete('/:id', deleteExpense);

module.exports = router;
