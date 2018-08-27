import Joi from 'joi'


export const schemas = {
  idSchema: Joi.object({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  payeeCreateSchema: Joi.object({
    name: Joi.string().required(),
    defaultCategoryID: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    defaultTransactionType: Joi.string().valid(['inflow', 'outflow']),
    googlePlace: Joi.object(),
    budgetID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  payeeUpdateSchema: Joi.object({
    name: Joi.string(),
    defaultCategoryID: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    defaultTransactionType: Joi.string().valid(['inflow', 'outflow']),
    googlePlace: Joi.object(),
  }),
}