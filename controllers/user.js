const User = require("../models/user");
const yup = require("yup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Category, Type } = require("../data");

const userSchema = new yup.ObjectSchema({
  lastName: yup.string().trim().max(30).required(),
  firstName: yup.string().trim().max(30).required(),
  email: yup.string().trim().max(30).email("email is invalid").required(),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "passwords do not match.")
    .required(),
  password: yup.string().trim().max(30).min(6).required(),
});

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is missing" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is missing" });
  }
  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    const user = {
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      _id: existingUser._id,
    };
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err?.message || JSON.stringify(err) });
  }
};

const register = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const userData = {
      email: email.toLowerCase(),
      password,
      confirmPassword,
      firstName,
      lastName,
    };

    await userSchema.validate(userData);

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: err?.message || JSON.stringify(err) });
  }
};

module.exports = { login, register };
