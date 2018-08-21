import Joi from 'joi';


export const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  budgetCreateSchema: Joi.object().keys({
    name: Joi.string().required(),
    startDate: Joi.date().iso().required()
  }),
  budgetUpdateSchema: Joi.object().keys({
    name: Joi.string(),
    startDate: Joi.date().iso(),
    payeeIDs: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    acountIDs: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    groupIDs: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
  }),
}