const IncomeModal = require('../models/incomeModal');

// GET all Income
const getIncomes = async (req, res) => {
  const userId = req.user._id;
  const allIncome = await IncomeModal.find({userId});
  res.status(200).json(
    allIncome.map(
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

// GET single income
const getIncome = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const allIncome = await IncomeModal.find({ _id: id, userId });
  res.status(200).json(allIncome[0]);
};

// ADD new income
const addIncome = async (req, res) => {
  const userId = req.user._id;
  try {
    const income = await IncomeModal.create({...req.body,userId});
    res.status(200).json(income);
  } catch {
    (err) => {
      res.status(500).json({ message: err.message });
    };
  }
};

// DELETE a income
const deleteIncome = async (req, res) => {
  const { id } = req.params;
  const { deletedCount } = await IncomeModal.deleteOne({ _id: id });
  if (deletedCount) {
    res.status(200).json({ message: 'successfully deleted', status: true });
  } else {
    res.status(201).json({ message: 'not deleted', status: false });
  }
};

// UPDATE a Income
const updateIncome = async (req, res) => {
  const { id } = req.params;
  const response = await IncomeModal.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(404).json({ message: 'Income not found' });
  }
};

module.exports = {
  getIncomes,
  addIncome,
  getIncome,
  deleteIncome,
  updateIncome,
};
