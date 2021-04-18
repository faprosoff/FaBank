const express = require("express");
const router = express.Router();
const verify = require("../commons/verifyToken");
const Account = require("../models/Account");
const User = require("../models/User");
const { movementsValidation } = require("../validations/movementsValidations");
const { accountsValidation } = require("../validations/accountsValidations");
const { validateUniqueCbu } = require("../services/accountsService");

// Create account and assign to user
router.post("/", verify, async (req, res) => {
  // Validate data before creating the account
  const { error } = accountsValidation(req.body);
  if (error)
    return res.status(400).send({ ok: false, error: error.details[0].message });

  // Get last account number
  const lastAccount = await Account.find({ userId: req.user._id })
    .sort({ number: -1 })
    .limit(1);
  let accountNumber = lastAccount.length > 0 ? lastAccount[0].number + 1 : 1;

  // Get gift for firsts accounts
  const gifts = { 1: 30000, 2: 15000, 3: 10000, default: 0 };
  const initialBalance = gifts[accountNumber] || gifts["default"];

  // Validate unique alias
  const validateIfExistsAlias = await Account.find({
    userId: req.user._id,
    alias: req.body.alias,
  });
  if (validateIfExistsAlias.length > 0)
    return res
      .status(400)
      .send({ ok: false, error: "El alias de la cuenta ya existe" });

  // Get cbu
  let cbu = await validateUniqueCbu(
    req.body.subsidiary,
    accountNumber,
    req.user._id
  );

  // Create account
  const account = new Account({
    number: accountNumber,
    balance: initialBalance,
    active: true,
    created: new Date(),
    cbu: cbu,
    alias: req.body.alias,
    subsidiary: req.body.subsidiary,
  });

  // Save account
  try {
    account.userId = req.user._id;
    await account.save();
    res.status(200).send({ ok: true, account: account });
  } catch (error) {
    res.status(500).send({ ok: false, error: error });
  }
});

// Create movement in account
router.post("/:id/movements", verify, async (req, res) => {
  // Validate data before creating the movement
  const { error } = movementsValidation(req.body);
  if (error)
    return res.status(400).send({ ok: false, error: error.details[0].message });

  // Find accounts
  let accountOrigin = await Account.findById(req.params.id);
  if (accountOrigin.balance < req.body.amount) {
    return res
      .status(409)
      .send({ ok: false, error: "No tiene balance suficiente para realizar la operación" });
  }
  let accountDestination = await Account.find({
    $or: [
      { cbu: req.body.destination.cbu },
      { alias: req.body.destination.alias },
    ],
  });
  accountDestination = accountDestination[0];

  // Validates that the account does not make a transfer to itself
  if (accountDestination && accountOrigin.cbu == accountDestination.cbu) {
    return res.status(400).send({ ok: false, error: 'No puede transferirse a la misma cuenta' });
  }

  // Find users
  const userOrigin = await User.findById(accountOrigin.userId);
  const userDestination = accountDestination
    ? await User.findById(accountDestination.userId)
    : null;
  let cbu;
  let alias;

  // Create movement
  if (accountDestination) {
    cbu = accountDestination.cbu;
    alias = accountDestination.alias;
  } else if (req.body.destination.cbu != null) {
    cbu = req.body.destination.cbu;
  } else {
    alias = req.body.destination.alias;
  }

  const origin = {
    user: userOrigin.name.firstName + " " + userOrigin.name.lastName,
    cbu: accountOrigin.cbu,
    alias: accountOrigin.alias,
  };

  const destination = {
    cbu: cbu,
    alias: alias,
  };

  if (userDestination) {
    destination.user =
      userDestination.name.firstName + " " + userDestination.name.lastName;
  }

  const movementOrigin = {
    created: new Date(),
    description: req.body.description,
    amount: parseInt(req.body.amount) * -1,
    balance: accountOrigin.balance - parseInt(req.body.amount),
    origin: origin,
    destination: destination,
  };

  
  let movementDestination = null;
  if (accountDestination) {
    movementDestination = {
      created: new Date(),
      description: req.body.description,
      amount: parseInt(req.body.amount),
      balance: accountDestination.balance + parseInt(req.body.amount),
      origin: origin,
      destination: destination,
    };
  }
  
  // Save movement and update balance
  try {
    // Origin account
    accountOrigin.balance = accountOrigin.balance + movementOrigin.amount;
    accountOrigin.movements.push(movementOrigin);
    await accountOrigin.save();

    // Destination account
    if (accountDestination) {
      accountDestination.balance = accountDestination.balance + movementDestination.amount;
      accountDestination.movements.push(movementDestination);
      await accountDestination.save();
    }

    res.status(200).send({ ok: true, movement: movementOrigin });
  } catch (error) {
    res.status(500).send({ ok: false, error: error });
  }
});

// Get accounts (only actives) without movements
router.get("/", verify, async (req, res) => {
  try {
    const accounts = await Account.find(
      { userId: req.user._id, active: true },
      { movements: 0 }
    );
    res.status(200).send({ ok: true, accounts: accounts });
  } catch (error) {
    res.status(400).send({ ok: false, error: error });
  }
});

// Get account with movements
router.get("/:id", verify, async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    res.status(200).send({ ok: true, account: account });
  } catch (error) {
    res.status(500).send({ ok: false, error: error });
  }
});

// Update account alias, active and closed status
router.patch("/:id", verify, async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    const accountForUpdate = {};

    if (!req.body.active && !account.closed) {
        
      if (account.balance > 0) {
          return res.status(400).send({ ok: false, error: 'La cuenta tiene saldo, no puede borrarla' });
      }

      accountForUpdate.active = req.body.active;
      accountForUpdate.closed = new Date();
    }
    if (req.body.alias) accountForUpdate.alias = req.body.alias;

    const updatedAccount = await Account.updateOne(
      { _id: req.params.id },
      { $set: accountForUpdate }
    );
    res.status(200).send({ ok: true, updatedAccount: updatedAccount });
  } catch (err) {
    res.status(500).send({ ok: false, error: err });
  }
});

module.exports = router;
