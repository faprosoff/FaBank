const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.object({
            firstName: Joi.string().required().messages({
                'any.required': 'El nombre es obligatorio',
            }),
            lastName: Joi.string().required().messages({
                'any.required': 'El apellido es obligatorio',
            }),
        }),
        email: Joi.string().min(6).required().email().messages({
            'string.min': 'El mail debe tener al menos 6 caracteres',
        }),
        password: Joi.string().min(8).required().messages({
            'string.min': 'La contraseña debe tener al menos 8 caracteres',
        }),
        document: Joi.string().required().min(7).max(8).messages({
            'string.min': 'El número de documento no puede tener menos de 7 caracteres',
            'string.max': 'El número de documento no puede tener más de 8 caracteres',
            'any.required': 'El número de documento es obligatorio',
        }),
        documentType: Joi.string().required().messages({
            'any.required': 'El tipo de documento es obligatorio',
        }),
        address: Joi.string()
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
