import Joi from 'joi';


export const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  budgetCreateSchema: Joi.object().keys({
    name: Joi.string().required(),
    startDate: Joi.date().iso().required(),
    payees: Joi.array().items(Joi.string()),
    acounts: Joi.array().items(Joi.string()),
    groups: Joi.array().items(Joi.string()),
  }),
  budgetUpdateSchema: Joi.object().keys({
    name: Joi.string(),
    startDate: Joi.date().iso(),
    payees: Joi.array().items(Joi.string()),
    acounts: Joi.array().items(Joi.string()),
    groups: Joi.array().items(Joi.string()),
  }),
}