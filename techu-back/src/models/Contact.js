const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    referenceName: { type: String, required: [true, 'El nombre de referencia es obligatorio'] },
    fullName: { type: String, required: [true, 'EL nombre completo es obligatorio'] },
    cbu: { type: String, required: false },
    alias: { type: String, required: false }
});

module.exports = mongoose.model('Contact', contactSchema);
