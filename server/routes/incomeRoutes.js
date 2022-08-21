const express = require('express');
const router = express.Router();
const {
  getIncomes,
  addIncome,
  getIncome,
  deleteIncome,
  updateIncome
} = require('../controllers/incomeController');

router.get('/', getIncomes);

router.get('/:id', getIncome);

router.post('/', addIncome);

router.patch('/:id', updateIncome);

router.delete('/:id', deleteIncome);

module.exports = router;
