import Joi from 'joi';


export const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  accountCreateSchema: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    type: Joi.string().valid(["checking", "savings", "credit", "loan", "mortgage", "investment", "cash", "other"]),
    startDate: Joi.date().iso().required(),
    startBalance: Joi.number().precision(2).required(),
    budgeted: Joi.boolean(),
    plaidAccount: Joi.object(),
    budgetID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  accountUpdateSchema: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    type: Joi.string().valid(["checking", "savings", "credit", "loan", "mortgage", "investment", "cash", "other"]),
    startDate: Joi.date().iso(),
    startBalance: Joi.number().precision(2),
    budgeted: Joi.boolean(),
    plaidAccount: Joi.object()
  }),
}