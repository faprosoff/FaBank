const express = require("express");
const { isValidObjectId } = require("mongoose");
const router = express.Router();
const verify = require("../commons/verifyToken");
const Contact = require("../models/Contact");
const User = require("../models/User");
const { contactsValidation } = require("../validations/contactsValidations");

// Get all contacts from the user (takes the id from the token)
router.get("/", verify, async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user._id });
    res.status(200).send({ ok: true, contacts: contacts });
  } catch (error) {
    res.status(500).send({ ok: false, error: error });
  }
});

// Create and assign contact to user
router.post("/", verify, async (req, res) => {
  // Validate data before creating the contact
  const { error } = contactsValidation(req.body);
  if (error)
    return res.status(400).send({ ok: false, error: error.details[0].message });

  // Checking that the contact doesnt exists for that user
  let validateIfExistsCbu = 0;
  let validateIfExistsReferenceName = 0;
  let validateIfExistsAlias = 0;

  validateIfExistsReferenceName = await Contact.find({
    userId: req.user._id,
    referenceName: req.body.referenceName,
  });

  if (req.body.cbu) {
    validateIfExistsCbu = await Contact.find({
      userId: req.user._id,
      cbu: req.body.cbu,
    });
  }

  if (req.body.alias) {
    validateIfExistsAlias = await Contact.find({
      userId: req.user._id,
      alias: req.body.alias,
    });
  }

  if (
    validateIfExistsCbu.length > 0 ||
    validateIfExistsReferenceName.length > 0 ||
    validateIfExistsAlias.length > 0
  ) {
    return res.status(409).json({ ok: false, error: "El contacto ya existe" });
  }

  // Create contact
  const contact = new Contact({
    referenceName: req.body.referenceName,
    fullName: req.body.fullName,
    cbu: req.body.cbu,
    alias: req.body.alias,
  });

  // Saving contact in DB
  try {
    contact.userId = req.user._id;
    await contact.save();
    res.status(200).send({ ok: true, contact: contact });
  } catch (error) {
    res.status(500).send({ ok: false, error: error });
  }
});

// Delete a contact
router.delete("/:id", verify, async (req, res) => {
  const query = { _id: req.params.id };
  Contact.deleteOne(query, function (error, contact) {
    if (error) return res.status(500).json({ ok: false, error: error });
    res.status(200).send({ ok: true, contact });
  });
});

module.exports = router;
