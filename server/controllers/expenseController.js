const ExpenseModal = require('../models/expenseModal');

// GET all Expense
const getExpenses = async (req, res) => {
  const allExpense = await ExpenseModal.find({});
  res.status(200).json(
    allExpense.map(
      ({ title, createdAt, updatedAt, description, amount, _id }) => ({
        title,
        createdAt:createdAt.toLocaleDateString('en-us'),
        updatedAt:updatedAt.toLocaleDateString('en-us'),
        description,
        amount,
        id: _id,
      })
    )
  );
};

// GET single Expense
const getExpense = async (req, res) => {
  const { id } = req.params;
  const allExpense = await ExpenseModal.find({ _id: id });
  res.status(200).json(allExpense[0]);
};

// ADD new Expense
const addExpense = async (req, res) => {
  try {
    const expense = await ExpenseModal.create(req.body);
    res.status(200).json(expense);
  } catch {
    (err) => {
      res.status(500).json({ message: err.message });
    };
  }
};

// DELETE a Expense
const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const { deletedCount } = await ExpenseModal.deleteOne({ _id: id });
  if (deletedCount) {
    res.status(200).json({ message: 'successfully deleted', status: true });
  } else {
    res.status(201).json({ message: 'not deleted', status: false });
  }
};

// UPDATE a Expense
const updateExpense = async (req, res) => {
  const { id } = req.params;
  const response = await ExpenseModal.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(404).json({ message: 'Expense not found' });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
