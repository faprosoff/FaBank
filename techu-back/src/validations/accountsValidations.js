const Joi = require('@hapi/joi');

const accountsValidation = (data) => {
    const schema = Joi.object({
        alias: Joi.string().required(),
        subsidiary: Joi.number().min(1).max(9999).required().messages({
            'string.min': 'El número de sucursal no puede ser menor a 1',
            'string.max': 'El número de sucursal no puede ser mayor a 9999',
        })
    });
    return schema.validate(data);
};

module.exports.accountsValidation = accountsValidation;
