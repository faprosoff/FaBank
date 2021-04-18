const Joi = require('@hapi/joi');

const contactsValidation = (data) => {
    const schema = Joi.object({
        referenceName: Joi.string().min(4).required().messages({
            'string.min': 'El nombre de referencia no puede tener menos de 4 caracteres',
        }),
        fullName: Joi.string().min(4).required().messages({
            'string.min': 'El nombre completo no puede tener menos de 4 caracteres',
        }),
        cbu: Joi.string().pattern(/^[0-9]+$/),
        alias: Joi.string().min(4).messages({
            'string.min': 'El alias no puede tener menos de 4 caracteres',
        })
    }).or('cbu', 'alias');
    return schema.validate(data);
};

module.exports.contactsValidation = contactsValidation;