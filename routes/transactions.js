const express = require("express");
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions.js");

const router = express.Router();

router.get("/", getTransactions);

router.post("/", createTransaction);

router.patch("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

module.exports = router;
