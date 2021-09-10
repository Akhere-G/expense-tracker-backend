const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  isGoogle: boolean,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
