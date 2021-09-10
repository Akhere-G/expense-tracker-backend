const mongoose = require("mongoose");
const { Category } = require("../data");

const transactionSchema = mongoose.Schema({
  amount: Number,
  type: { type: String, default: "expense", enum: ["expense", "income"] },
  category: {
    type: String,
    default: "none",
    enum: Object.values(Category),
  },
  description: { type: String, default: "" },
  date: Date,
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
