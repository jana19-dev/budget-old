import Joi from 'joi'


export const schemas = {
  idSchema: Joi.object({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('ID should be a valid ObjectID.'))
  }),
  budgetCreateSchema: Joi.object({
    name: Joi.string().required(),
    startDate: Joi.date().iso().required(),
  }),
  budgetUpdateSchema: Joi.object({
    name: Joi.string(),
    startDate: Joi.date().iso(),
    accountIDs: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).unique(),
    groupIDs: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).unique()
  }),
}


