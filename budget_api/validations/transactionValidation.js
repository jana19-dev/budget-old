import Joi from 'joi'


export const schemas = {
  idSchema: Joi.object({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),

  transactionCreateSchema: Joi.object({
    date: Joi.date().iso().required(),
    recurring: Joi.object({
      frequency: Joi.string().valid(['once', 'monthly', 'weekly', 'bi-weekly', 'month-end', 'bi-monthly', 'quaterly', 'semi-anually', 'anually']),
      startDate: Joi.date().iso().required().min('now'),
      untilDate: Joi.date().iso().min(Joi.ref('startDate')),
      noOfPayments: Joi.number().positive().integer()
    }).xor('untilDate', 'noOfPayments'),
    inflow: Joi.number().positive().precision(2),
    outflow: Joi.number().positive().precision(2),
    cleared: Joi.boolean(),
    tag: Joi.string(),
    memo: Joi.string(),
    attachment: Joi.string().uri(),
    plaidTransaction: Joi.object(),
    payeeID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    accountID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    categoryID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    budgetID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }).xor('inflow', 'outflow'),

  transactionUpdateSchema: Joi.object({
    date: Joi.date().iso(),
    recurring: Joi.object({
      frequency: Joi.string().valid(['once', 'monthly', 'weekly', 'bi-weekly', 'month-end', 'bi-monthly', 'quaterly', 'semi-anually', 'anually']),
      startDate: Joi.date().iso().min('now'),
      untilDate: Joi.date().iso().min(Joi.ref('startDate')),
      noOfPayments: Joi.number().positive().integer()
    }).xor('untilDate', 'noOfPayments'),
    inflow: Joi.number().positive().precision(2),
    outflow: Joi.number().positive().precision(2),
    cleared: Joi.boolean(),
    tag: Joi.string(),
    memo: Joi.string(),
    attachment: Joi.string().uri(),
    plaidTransaction: Joi.object(),
    payeeID: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    accountID: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    categoryID: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
  }).xor('inflow', 'outflow'),
}