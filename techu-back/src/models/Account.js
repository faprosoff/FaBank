const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  number: { type: Number, require: [true, 'El número de cuenta es obligatorio']},
  balance: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  closed: { type: Date, require: false },
  cbu: { type: String, require: [true, 'El cbu es obligatorio'] },
  alias: { type: String, require: [true, 'El alias es obligatorio'] },
  subsidiary: { type: Number, min: 1, max: 9999, require: [true, 'El número de sucursal es obligatorio'] },
  movements: [
    {
      created: { type: Date, default: Date.now },
      description: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 30,
      },
      amount: { type: Number, required: [true, 'El monto es obligatorio'] },
      balance: { type: Number, required: [true, 'El balance es obligatorio'] },
      origin: {
        user: { type: String, required: [true, 'El usuario origen es obligatorio'] },
        cbu: { type: String, required: [true, 'El cbu origen es obligatorio'] },
        alias: { type: String, required: [true, 'El alias origen es obligatorio'] },
      },
      destination: {
        user: { type: String, required: false },
        cbu: { type: String, required: false },
        alias: { type: String, required: false },
      },
    },
  ],
});

module.exports = mongoose.model("Account", accountSchema);
