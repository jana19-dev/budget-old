import Joi from 'joi'


export const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),

  categoryCreateSchema: Joi.object().keys({
    name: Joi.string().required().invalid('unknown'),
    groupID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    budgetID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  
  categoryUpdateSchema: Joi.object().keys({
    name: Joi.string().invalid('unknown'),
    budgeted: Joi.array().items(Joi.object({
      date: Joi.date().iso().required(),
      amount: Joi.number().precision(2).required()
    })).unique((a, b) => a.date === b.date)
  }),
}