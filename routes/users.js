const express = require("express");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel, userValid, loginValid, createToken } = require("../models/userModel");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/", async (req, res) => {
  const validBody = userValid(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    user.role = "USER";
    await user.save();
    user.password = "*******";
    res.status(201).json(user);
  } catch (error) {
    if (error.code == 11000) {
      return res.status(400).json({ err: "Email already in system", code: 11000 });
    }
    console.log(error);
    res.status(502).json({ err: "There problem come back later" });
  }
});


router.post("/login", async (req, res) => {
  const validBody = loginValid(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    let passwordValid = false;

    if (user) passwordValid = await bcrypt.compare(req.body.password, user.password);

    if (!user || !passwordValid) {
      return res.status(401).json({ msg: "email or password incorrect" });
    }
    const token = createToken(user._id);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(502).json({ err: "There problem come back later" });
  }
});

module.exports = router;