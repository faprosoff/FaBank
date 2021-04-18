const Joi = require('@hapi/joi');

const movementsValidation = (data) => {
    const schema = Joi.object({
        description: Joi.string().min(3).max(30).optional().messages({
            'string.min': 'La descripción debe tener más de 3 caracteres',
            'string.max': 'La descripción debe tener menos de 30 caracteres',
        }),
        amount: Joi.number().min(1).required().messages({
            'string.min': 'El monto ingresado no puede ser menor a 1',
        }),
        destination: Joi.object({
            user: Joi.string().optional(),
            cbu: Joi.string().allow(null),
            alias: Joi.string().allow(null).when('cbu', { is: null, then: Joi.string() })
        }).or('cbu', 'alias')
    });
    return schema.validate(data);
};

module.exports.movementsValidation = movementsValidation;
