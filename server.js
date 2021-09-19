const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path")

const transactionRoutes = require("./routes/transactions");
const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/transactions", auth, transactionRoutes);

app.use("/", (req, res) => res.send("Welcome to the expense tracker api!"))

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(`Could not connect. ${err.message}`));
