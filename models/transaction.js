const mongoose = require("mongoose");
const { Category, Type } = require("../data");

const transactionSchema = mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, required: true, enum: Type },
  category: {
    type: String,
    required: true,
    enum: Object.values(Category),
  },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  ownerId: { type: String, required: true },
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
