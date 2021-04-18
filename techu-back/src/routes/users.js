const express = require("express");
const router = express.Router();
const verify = require("../commons/verifyToken");
const User = require("../models/User");

// Get user
router.get("/", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select({ password: 0 });
    res.status(200).send({ ok: true, user: user });
  } catch (err) {
    res.status(400).send({ ok: false, error: err });
  }
});

// Update user
router.patch("/", verify, async (req, res) => {
  try {
    const userForUpdate = {};

    if (req.body.email) userForUpdate.email = req.body.email;
    if (req.body.address) userForUpdate.address = req.body.address;

    const updatedUser = await User.updateOne(
      { _id: req.user._id },
      { $set: userForUpdate }
    );
    res.status(200).send({ ok: true, user: updatedUser });
  } catch (err) {
    res.status(400).send({ ok: false, error: err });
  }
});

module.exports = router;
