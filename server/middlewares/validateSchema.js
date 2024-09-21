const Joi = require('joi');

const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
})
const logInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})
const contactSchema = Joi.object({
    email: Joi.string().email().required(),
    message: Joi.string().required()
})

const validateSchema = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            next()
        } catch (err) {
            next(err)
        }
    }
}

module.exports = { signUpSchema, logInSchema, contactSchema, validateSchema }