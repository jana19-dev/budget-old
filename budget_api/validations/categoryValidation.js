import Joi from 'joi'


export const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  categoryCreateSchema: Joi.object().keys({
    name: Joi.string().required(),
    visible: Joi.boolean(),
    groupID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  categoryUpdateSchema: Joi.object().keys({
    name: Joi.string(),
    visible: Joi.boolean(),
    budgeted: Joi.array().items(Joi.object({
      date: Joi.date().iso().required(),
      amount: Joi.number().precision(2).required()
    }))
  }),
}