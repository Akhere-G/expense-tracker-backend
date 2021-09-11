const User = require("../models/user");
const yup = require("yup");
const bcrypt = require("bycrypt");
const jwt = require("jsonwebtoken");

const { Category, Type } = require("../data");

const userSchema = new yup.ObjectSchema({
  isGoogle: yup.boolean().required(),
  firstName: yup.string().required().max(30),
  lastName: yup.string().required().max(30),
  email: yup.string().required().max(30).email(),
  password: yup.string().required().max(30).min(6),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords do not match."),
});

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser);

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

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const register = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const userData = {
      email,
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
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, register };
