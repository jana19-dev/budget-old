import Joi from 'joi'


export const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  userRegisterSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirmation: Joi.string().required()
  }),
  userLoginSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}