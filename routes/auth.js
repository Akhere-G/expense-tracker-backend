const express = require("express");
const { login, register } = require("../controllers/user");
const router = new express.Router();

router.post("/login", login);
router.post("/register", register);

module.exports = router;
