import Joi from 'joi'


export const schemas = {
  idSchema: Joi.object({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),

  groupCreateSchema: Joi.object({
    name: Joi.string().required().invalid('unknown'),
    visible: Joi.boolean(),
    budgetID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  
  groupUpdateSchema: Joi.object({
    name: Joi.string().invalid('unknown'),
    visible: Joi.boolean(),
    categoryIDs: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).unique(),
    budgetID: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
  }),
}