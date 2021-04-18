const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  registerValidation,
  loginValidation,
} = require("../validations/authValidations");

TOKEN_LIFE = '30m';

// Register
router.post("/register", async (req, res) => {
  // Validate data before create user
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).send({ ok: false, error: error.details[0].message });

  // Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send({ ok: false, error: "El mail ingresado ya existe" });

  const dniExists = await User.findOne({ document: req.body.document });
  if (dniExists)
    return res
      .status(400)
      .send({ ok: false, error: "El documento ingresado ya existe" });

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    name: {
      firstName: req.body.name.firstName,
      lastName: req.body.name.lastName,
    },
    email: req.body.email,
    password: hashedPassword,
    document: req.body.document,
    documentType: req.body.documentType,
    address: req.body.address,
  });
  try {
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {expiresIn: TOKEN_LIFE });
    res
      .status(200)
      .header("auth-token", token)
      .send({ ok: true, user: user._id, token: token });
  } catch (error) {
    res.status(400).send({ ok: false, error: error });
  }
});

// Login
router.post("/login", async (req, res) => {
  // Validate data before create user
  const { error } = loginValidation(req.body);
  if (error)
    return res.status(400).send({ ok: false, error: error.details[0].message });

  // Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .send({ ok: false, error: "Los datos ingresados no son válidos" });

  // Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res
      .status(400)
      .send({ ok: false, error: "Los datos ingresados no son válidos" });

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET,{expiresIn: TOKEN_LIFE } );
  res.header("auth-token", token).send({ ok: true, token: token });
});

module.exports = router;
