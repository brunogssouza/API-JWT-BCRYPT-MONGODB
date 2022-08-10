// VALIDATION WITH JOI
import Joi from '@hapi/joi'

export const registerValidation = (data) => {

const joiRegisterSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().email().min(10).required(),
    password: Joi.string().min(6).required()
})

return joiRegisterSchema.validate(data);


}

//LOGIN VALIDATION
export const loginValidation = (data) => {

const joiLoginSchema = Joi.object({
    email: Joi.string().email().min(10).required(),
    password: Joi.string().min(6).required()
})

return joiLoginSchema.validate(data);
}

