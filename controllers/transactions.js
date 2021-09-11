const Transaction = require("../models/transaction");
const yup = require("yup");
const mongoose = require("mongoose");

const { Category, Type } = require("../data");

const transactionSchema = new yup.ObjectSchema({
  date: yup.date().required(),
  description: yup.string().max(30).required(),
  category: yup.string().required().oneOf(Object.values(Category)),
  type: yup.string().required().oneOf(Type),
  amount: yup.number().required().moreThan(0),
});

module.exports.getTransactions = async (req, res) => {
  try {
    const ownerId = req.userId;
    const transactions = await Transaction.find({ ownerId }).sort({ date: -1 });
    res.status(200).json({ transactions, total: transactions.lenght });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.createTransaction = async (req, res) => {
  try {
    const ownerId = req.userId;
    const { amount, type, category, description, date } = req.body;

    const transactionData = {
      amount,
      type,
      category,
      description,
      date,
    };

    await transactionSchema.validate(transactionData);

    const newTransaction = new Transaction({ ...transactionData, ownerId });

    const json = await newTransaction.save();

    res.status(201).json({ result: json });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateTransaction = async (req, res) => {
  try {
    const { amount, type, category, description, date } = req.body;

    const { id } = req.params;

    const transactionData = { amount, type, category, description, date };

    await transactionSchema.validate(transactionData);

    const result = await Transaction.findByIdAndUpdate(id, transactionData);

    if (!result) {
      return res.status(404).json({ message: `No transaction with id ${id}` });
    }

    res.status(201).json({ result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Transaction.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: `No transaction with id ${id}` });
    }
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json(err);
  }
};
