const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		firstName: { type: String, required: [true, 'El nombre del usuario es obligatorio'] },
		lastName: { type: String, required: [true, 'El apellido del usuario es obligatorio'] }
	},
	email: { type: String, unique: true, required: [true, 'El email del usuario es obligatorio'] },
	password: { type: String, required: [true, 'La contraseña del usuario es obligatoria'] },
	document: { type: Number, unique: true, required: [true, 'El número de documento del usuario es obligatorio'] },
	documentType: { type: String, required: [true, 'El tipo de documento del usuario es obligatorio'] },
	address: { type: String, required: false },
	created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
